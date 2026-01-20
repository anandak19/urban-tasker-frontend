import { Injectable } from '@angular/core';
import { IOfferFrom } from '@features/user/models/chat/video-chat.model';

type TCallMode = 'caller' | 'callee';

@Injectable({
  providedIn: 'root',
})
export class CallStateService {
  mode!: TCallMode;
  offer?: RTCSessionDescriptionInit;
  toUserId?: string;

  setCaller(toUserId: string) {
    this.mode = 'caller';
    this.toUserId = toUserId;
  }

  setCallee(offerPayload: IOfferFrom) {
    this.mode = 'callee';
    this.offer = offerPayload.offer;
    this.toUserId = offerPayload.from.id;
  }
}
