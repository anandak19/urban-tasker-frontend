import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatSocketService } from '@features/user/services/chat-socket/chat-socket.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonComponent } from '@shared/components/button/button.component';
import { AuthGuardService } from '@core/services/auth-guard-service/auth-guard.service';
import { IChatUsers, IMessage } from '@features/user/models/chat/chat.model';
import { MatIconModule } from '@angular/material/icon';
import { ChatService } from '@features/user/services/chat/chat.service';
import { firstValueFrom, map } from 'rxjs';
import { MessageType } from '@shared/constants/enums/message-type.enum';
import { Dialog } from '@angular/cdk/dialog';
import { ImagePreviewModalComponent } from '@shared/components/ui/image-preview-modal/image-preview-modal.component';

export type TImageFile = string | number | null | undefined;

@Component({
  selector: 'app-chat-box',
  imports: [
    FormsModule,
    CommonModule,
    ButtonComponent,
    DatePipe,
    MatIconModule,
  ],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.scss',
})
export class ChatBoxComponent implements OnInit {
  private _currentUserId!: string;
  @Input()
  set currentUserId(value: string) {
    if (!value || value === this._currentUserId) return;

    this._currentUserId = value;
    this.messages.set([]);

    this.loadUserDetails();
    this.loadChatForUser(value);

    this._chatSocket.readMessage(value);
  }
  //remove this one later
  @Input() currentUser = signal<IChatUsers | null>(null);
  @Output() closeChat = new EventEmitter();
  @Input() isMobileScreen = true;

  //socket
  private _chatSocket = inject(ChatSocketService);
  private _chatService = inject(ChatService);
  private _destroyRef = inject(DestroyRef);
  messages = signal<IMessage[]>([]);
  message = '';

  messageType = MessageType;

  currentChatUser = signal<IChatUsers | null>(null);

  private _authGuardService = inject(AuthGuardService);
  private _dialog = inject(Dialog);
  loggedInUser = this._authGuardService.currentUser;

  loadUserDetails() {
    this.currentChatUser.set(this.currentUser());
  }

  openImagePreview(imageUrl?: string) {
    this._dialog.open(ImagePreviewModalComponent, {
      data: imageUrl,
    });
  }

  onEnter() {
    this.sendMessage();
  }
  // events
  sendMessage() {
    const text = this.message.trim();
    if (!text) return;
    this._chatSocket.sendTextMessage(text);
    this.message = '';
  }

  async loadChatForUser(roomId: string) {
    const history = await this._chatSocket.getMessages();
    console.log(history);
    this._chatSocket.readMessage(roomId);

    this.messages.set(history);
  }

  uploadImage(imageFile: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', imageFile);

    return firstValueFrom(
      this._chatService
        .uploadImage(formData)
        .pipe(map((res) => res.data.publicKey)),
    );
  }

  async onImageSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    // upload to S3 → get key → send socket message
    const publicKey = await this.uploadImage(file);
    this.sendImageMessage(publicKey);
  }

  sendImageMessage(publicKey: string) {
    this._chatSocket.sendImageMessage(publicKey);
  }

  listenToMsg() {
    console.log('[chat box] message listner registered');
    this._chatSocket.onMessage().subscribe({
      next: (res) => {
        console.log(res);

        this.messages.update((c) => [...c, res]);
        const currentUser = this.currentChatUser();

        if (currentUser?.id && res.senderId === currentUser?.id) {
          this._chatSocket.readMessage(currentUser?.id);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.listenToMsg();
  }
}
