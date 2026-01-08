import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  Input,
  OnDestroy,
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

@Component({
  selector: 'app-chat-layout',
  imports: [CommonModule, FormsModule, ChatBoxComponent, EmptyChatBoxComponent],
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.scss',
})
export class ChatLayoutComponent implements OnInit, OnDestroy {
  //from param
  @Input() roomId!: string;
  isMobile = false;
  private readonly _currentChatUser = signal<IChatUsers | null>(null);

  @Input()
  set chatUser(value: IChatUsers | null) {
    this._currentChatUser.set(value);
  }

  readonly currentChatUser = this._currentChatUser;

  private _chatSocket = inject(ChatSocketService);
  private _chatService = inject(ChatService);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);
  private _router = inject(Router);
  private route = inject(ActivatedRoute);
  private breakpointObserver = inject(BreakpointObserver);

  chatUsers = signal<IChatUsers[]>([]);

  async joinChat(chat: IChatUsers) {
    await this._chatSocket.joinChat(chat.id);
    this.updateChatUrl(chat.id);
    this.currentChatUser.set(chat);
  }

  updateChatUrl(chatId: string) {
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
          console.log('selected user', res.data);
          this.currentChatUser.set(res.data);
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
    this.currentChatUser.set(null);
  }

  // -- call method to get chating users
  // on init connect to the socket server
  ngOnInit(): void {
    console.log('cha');
    this.observerBreakpoint();
    this._chatSocket.connect();
    this._chatSocket.onConnect(() => {
      console.log('Socket connected');
      this.afterSocketConnected();
    });
  }

  ngOnDestroy(): void {
    this._chatSocket.disconnect();
  }
}
