import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IChatUsers, IMessage } from '../../chat-layout/chat-layout.component';
import { ChatSocketService } from '@features/user/services/chat-socket/chat-socket.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@shared/components/button/button.component';
import { AuthGuardService } from '@core/services/auth-guard-service/auth-guard.service';

@Component({
  selector: 'app-chat-box',
  imports: [FormsModule, CommonModule, ButtonComponent],
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

    console.log('User changed:', this._currentUserId);
    this.loadUserDetails(value);
    this.loadChatForUser(value);
    this._chatSocket.readMessage(value);
  }
  //remove this one later
  @Input() currentUser = signal<IChatUsers | null>(null);

  //socket
  private _chatSocket = inject(ChatSocketService);
  messages = signal<IMessage[]>([]);
  message = '';

  currentChatUser = signal<IChatUsers | null>(null);

  private _authGuardService = inject(AuthGuardService);
  loggedInUser = this._authGuardService.currentUser;

  loadUserDetails(userId: string) {
    console.log('Loading user datails', userId);
    this.currentChatUser.set(this.currentUser());
  }

  onEnter() {
    this.sendMessage();
  }
  // events
  sendMessage() {
    const text = this.message.trim();
    if (!text) return;
    this._chatSocket.sendMessage(text);
    this.message = '';
  }

  async loadChatForUser(userId: string) {
    console.log('loading chat of user with new id: ', userId);
    const history = await this._chatSocket.getMessages();
    console.log(history);

    this.messages.set(history);
  }

  listenToMsg() {
    console.log('[chat box] message listner registered');
    this._chatSocket.onMessage().subscribe({
      next: (res) => {
        console.log('Got the message, ', res);
        this.messages.update((c) => [...c, res]);
        const currentUser = this.currentChatUser();
        if (currentUser?.id && res.senderId === currentUser?.id) {
          console.log('read');

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
