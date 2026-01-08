import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IChatUsers } from '@features/user/pages/chat/chat-layout/chat-layout.component';
import { IApiResponseSuccess } from '@shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly API_ENDPOINT = 'chat';

  private _http = inject(HttpClient);

  /**
   *
   * @param partnerId
   * @returns Room id after fetching / creating room
   */
  getChatRoomId(partnerId: string) {
    return this._http.post<IApiResponseSuccess<{ roomId: string }>>(
      `${this.API_ENDPOINT}/room`,
      { partnerId },
    );
  }

  getChats() {
    return this._http.get<IApiResponseSuccess<IChatUsers[]>>(
      `${this.API_ENDPOINT}`,
    );
  }

  getChatByRoom(roomId: string) {
    return this._http.get<IApiResponseSuccess<IChatUsers>>(
      `${this.API_ENDPOINT}/${roomId}`,
    );
  }
}
