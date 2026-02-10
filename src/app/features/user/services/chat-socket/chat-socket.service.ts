import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessage } from '@features/user/models/chat/chat.model';
import { SocketManagerService } from '@core/services/socket-manager/socket-manager.service';
import { ISendMessage } from '@shared/models/chat/chat.model';
import {
  CHAT_CLIENT_EVENTS,
  CHAT_SERVER_EVENTS,
} from '@shared/constants/enums/events.enum';
import { MessageType } from '@shared/constants/enums/message-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ChatSocketService {
  private currentRoomId?: string;

  private _socketManager = inject(SocketManagerService);

  /* -------------------- CONNECTION -------------------- */

  connect(): void {
    this._socketManager.connect();
  }

  onConnect(cb: () => void) {
    this._socketManager.onConnect(cb);
  }

  disconnect(): void {
    this._socketManager.disconnect();
    this.currentRoomId = undefined;
  }

  /* -------------------- CHAT -------------------- */

  //works
  async joinChat(roomId: string): Promise<void> {
    if (this.currentRoomId === roomId) {
      return Promise.resolve();
    }

    try {
      await this._socketManager.safeEmit<
        { roomId: string },
        { success: boolean }
      >(CHAT_CLIENT_EVENTS.JOIN_CHAT, { roomId });
      this.currentRoomId = roomId;
    } catch (error) {
      console.error('Join chat failed', error);
    }
  }

  //works
  getMessages(): Promise<IMessage[]> {
    if (!this.currentRoomId) {
      return Promise.resolve([]);
    }

    return this._socketManager.safeEmit<{ roomId: string }, IMessage[]>(
      CHAT_CLIENT_EVENTS.GET_ALL_MESSAGES,
      {
        roomId: this.currentRoomId,
      },
    );
  }

  //works
  sendTextMessage(message: string): void {
    if (!this.currentRoomId) return;

    this._socketManager.safeEmit<ISendMessage>(
      CHAT_CLIENT_EVENTS.SEND_MESSAGE,
      {
        roomId: this.currentRoomId,
        type: MessageType.TEXT,
        message,
      },
    );
  }

  sendImageMessage(publicKey: string): void {
    if (!this.currentRoomId) return;

    this._socketManager.safeEmit<ISendMessage>(
      CHAT_CLIENT_EVENTS.SEND_MESSAGE,
      {
        roomId: this.currentRoomId,
        type: MessageType.IMAGE,
        publicKey,
      },
    );
  }

  readMessage(senderId: string): void {
    if (!this.currentRoomId) return;
    this._socketManager.emit(CHAT_CLIENT_EVENTS.READ_MESSAGE, {
      roomId: this.currentRoomId,
      senderId,
    });
  }

  /* -------------------- LISTENERS -------------------- */

  //works
  onMessage(): Observable<IMessage> {
    return this._socketManager.listen<IMessage>(CHAT_SERVER_EVENTS.NEW_MESSAGE);
  }
}
