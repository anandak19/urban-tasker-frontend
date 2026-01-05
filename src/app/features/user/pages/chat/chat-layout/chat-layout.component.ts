import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatSocketService } from '@features/user/services/chat-socket/chat-socket.service';
import { ButtonComponent } from '@shared/components/button/button.component';

export interface IChatUsers {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface IMessages {
  from: string;
  message: string;
}

@Component({
  selector: 'app-chat-layout',
  imports: [ButtonComponent, CommonModule, FormsModule],
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.scss',
})
export class ChatLayoutComponent implements OnInit {
  private _chatSocket = inject(ChatSocketService);
  currentChatUserId = signal<string | null>(null);
  currentChatUser = signal<IChatUsers | null>(null);
  messages = signal<IMessages[]>([]);
  message = '';

  // chatUsers = signal<IChatUsers[]>([]);
  chatUsers = signal<IChatUsers[]>([
    {
      id: '6951313127a982e7246c3cdf',
      name: 'Anandakrishnan sree',
    },
    {
      id: '6956b789a94364a21fdf55ce',
      name: 'Manoj Vasu',
    },
    {
      id: '6956b789a94364a21fdf55cd',
      name: 'Elon',
    },
  ]);

  listenToMsg() {
    console.log('[chat layout] message listner registered');
    this._chatSocket.onMessage().subscribe({
      next: (res) => {
        console.log('Got the message, ', res);
        this.messages.update((c) => [...c, res]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  joinChat(targetUser: IChatUsers) {
    if (targetUser.id === this.currentChatUser()?.id) return;

    this.messages.set([]);

    this._chatSocket.joinChat(targetUser.id);
    this.currentChatUser.set(targetUser);
  }

  sendMessage() {
    this._chatSocket.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit(): void {
    // on init connect to the socket server
    this._chatSocket.connect();
    this.listenToMsg();
  }
}
