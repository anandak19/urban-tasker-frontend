import { inject, Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { fromEvent, Observable, share } from 'rxjs';
import { AuthService } from '@core/services/auth/auth.service';
import { IMessage } from '@features/user/pages/chat/chat-layout/chat-layout.component';

interface JoinChatResponse {
  roomId: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatSocketService implements OnDestroy {
  private socket?: Socket;
  private currentRoomId?: string;

  private readonly SOCKET_URL = 'http://localhost:3000';

  private _authService = inject(AuthService);

  /* -------------------- CONNECTION -------------------- */

  connect(): void {
    if (this.socket?.connected) return;

    this.socket = io(this.SOCKET_URL, {
      withCredentials: true,
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.registerCoreListeners();
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = undefined;
    this.currentRoomId = undefined;
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  /* -------------------- CORE LISTENERS -------------------- */

  private registerCoreListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('[Socket] Connected:', this.socket?.id);
    });

    this.socket.on('disconnect', (reason) => {
      console.warn('[Socket] Disconnected:', reason);
    });

    this.socket.on('authError', (err: { message: string }) => {
      console.error('[Socket] Auth error:', err.message);
      this._authService.refreshToken().subscribe({
        next: () => {
          this.connect();
        },
      });
      this.disconnect();
    });
  }

  /* -------------------- CHAT -------------------- */

  joinChat(targetUserId: string): Promise<string> {
    console.log('Target:', targetUserId);

    if (!this.socket) {
      throw new Error('Socket not connected');
    }

    return new Promise((resolve, reject) => {
      this.socket!.emit(
        'joinChat',
        { targetUserId },
        (response: JoinChatResponse) => {
          if (!response?.roomId) {
            reject('Failed to join chat');
            return;
          }

          this.currentRoomId = response.roomId;
          console.log('rrom', this.currentRoomId);

          resolve(response.roomId);
        },
      );
    });
  }

  getMessages(): Promise<IMessage[]> {
    if (!this.socket || !this.currentRoomId) {
      console.log('[chat-socket-service]: no socket or roomid');
      return Promise.resolve([]);
    }

    return new Promise((resolve, _reject) => {
      this.socket?.emit(
        'getAllMessages',
        { roomId: this.currentRoomId },
        (messages: IMessage[]) => {
          console.log(messages);
          resolve(messages);
        },
      );
    });
  }

  sendMessage(message: string): void {
    if (!this.socket || !this.currentRoomId) return;

    this.socket.emit('sendMessage', {
      roomId: this.currentRoomId,
      message,
    });
  }

  readMessage(senderId: string): void {
    console.log(`[chat-socket-service] read message ${this.currentRoomId}`);

    if (!this.socket || !this.currentRoomId) return;

    this.socket.emit('readMessage', {
      roomId: this.currentRoomId,
      senderId,
    });
  }

  /* -------------------- LISTENERS -------------------- */

  onMessage(): Observable<IMessage> {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }

    return fromEvent<IMessage>(this.socket, 'newMessage').pipe(share());
  }

  onMessages(): Observable<IMessage[]> {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }

    return fromEvent<IMessage[]>(this.socket, 'messages').pipe(share());
  }

  onTyping(): Observable<{ userId: string }> {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }

    return fromEvent<{ userId: string }>(this.socket, 'typing').pipe(share());
  }
}
