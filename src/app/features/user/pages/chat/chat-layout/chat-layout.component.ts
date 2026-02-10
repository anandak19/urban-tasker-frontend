import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatSocketService } from '@features/user/services/chat-socket/chat-socket.service';
import { ChatBoxComponent } from '../components/chat-box/chat-box.component';
import { ChatService } from '@features/user/services/chat/chat.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IApiResponseError } from '@shared/models/api-response.model';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmptyChatBoxComponent } from '../components/empty-chat-box/empty-chat-box.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { IChatUsers } from '@features/user/models/chat/chat.model';
import { SocketManagerService } from '@core/services/socket-manager/socket-manager.service';

@Component({
  selector: 'app-chat-layout',
  imports: [CommonModule, FormsModule, ChatBoxComponent, EmptyChatBoxComponent],
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.scss',
})
export class ChatLayoutComponent implements OnInit {
  //from param
  @Input() roomId!: string;
  isMobile = false;
  private readonly _currentChat = signal<IChatUsers | null>(null);

  @Input()
  set chatUser(value: IChatUsers | null) {
    this._currentChat.set(value);
  }

  // video call
  isVideoCall = signal<boolean>(false);
  vcToUserId = signal<string>('');

  startVideoCall(toUserId: string) {
    this.vcToUserId.set(toUserId);
    this.isVideoCall.set(true);

    //logic to start video call
  }
  // video call

  readonly currentChat = this._currentChat;

  private _socketManagerService = inject(SocketManagerService);
  private _chatSocket = inject(ChatSocketService);
  private _chatService = inject(ChatService);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);
  private _router = inject(Router);
  private route = inject(ActivatedRoute);
  private breakpointObserver = inject(BreakpointObserver);

  chatUsers = signal<IChatUsers[]>([]);

  async joinChat(chat: IChatUsers) {
    console.log(chat);

    await this._chatSocket.joinChat(chat.id);
    this.updateChatUrl(chat.id);
    this.currentChat.set(chat);
  }

  updateChatUrl(chatId: string) {
    if (!this.roomId) return;
    this._router.navigate(['../', chatId], {
      relativeTo: this.route,
      replaceUrl: true,
    });
  }

  async joinSelectedRoom(roomId: string) {
    await this._chatSocket.joinChat(roomId);
    // call api to get current partner details with room id
    this._chatService
      .getChatByRoom(roomId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.currentChat.set(res.data);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  // get all chats of user
  getAllChats() {
    this._chatService
      .getChats()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.chatUsers.set(res.data);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  afterSocketConnected() {
    this.getAllChats();
    // if roomId select / load chat of that user
    if (this.roomId) {
      this.joinSelectedRoom(this.roomId);
    }
  }

  observerBreakpoint() {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }

  onCloseChat() {
    this.currentChat.set(null);
  }

  // -- call method to get chating users
  // on init connect to the socket server
  ngOnInit(): void {
    window.scroll(0, 0);
    this.observerBreakpoint();
    if (this._socketManagerService.isConnected()) {
      console.log('socekt is connecte now');
      this.afterSocketConnected();
    } else {
      this._socketManagerService.connect();
      this._socketManagerService.onConnect(() => this.afterSocketConnected());
    }
  }
}
