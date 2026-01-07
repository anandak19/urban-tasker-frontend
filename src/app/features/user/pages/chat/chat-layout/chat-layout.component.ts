import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatSocketService } from '@features/user/services/chat-socket/chat-socket.service';
import { ChatBoxComponent } from '../components/chat-box/chat-box.component';

export interface IChatUsers {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
}

export interface IMessage {
  senderId: string;
  roomId: string;
  text: string;
  isRead: boolean;
  id: string;
}

@Component({
  selector: 'app-chat-layout',
  imports: [CommonModule, FormsModule, ChatBoxComponent],
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.scss',
})
export class ChatLayoutComponent implements OnInit {
  private readonly _currentChatUser = signal<IChatUsers | null>(null);

  @Input()
  set chatUser(value: IChatUsers | null) {
    this._currentChatUser.set(value);
  }

  readonly currentChatUser = this._currentChatUser;

  private _chatSocket = inject(ChatSocketService);

  // chatUsers = signal<IChatUsers[]>([]);
  chatUsers = signal<IChatUsers[]>([
    {
      id: '6951313127a982e7246c3cdf',
      firstName: 'Anandakrishnan',
      lastName: 'sree',
    },
    {
      id: '6956b789a94364a21fdf55ce',
      firstName: 'Manoj',
      lastName: 'Vasu',
    },
    {
      id: '6956b789a94364a21fdf55cd',
      firstName: 'Elon',
      lastName: 'Musk',
    },
  ]);

  async joinChat(targetUser: IChatUsers) {
    if (targetUser.id === this.currentChatUser()?.id) return;
    await this._chatSocket.joinChat(targetUser.id);
    this.currentChatUser.set(targetUser);
    console.log(this.currentChatUser());
  }

  fullName(user: IChatUsers) {
    return `${user.firstName} ${user.lastName}`;
  }

  ngOnInit(): void {
    // -- call method to get chating users
    // on init connect to the socket server
    this._chatSocket.connect();
  }
}
