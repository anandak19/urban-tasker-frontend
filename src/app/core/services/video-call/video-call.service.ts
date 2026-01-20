import { inject, Injectable, signal } from '@angular/core';
import { SocketManagerService } from '../socket-manager/socket-manager.service';
import {
  IAnswerPayload,
  IAnswerResponse,
  ICallHangupFrom,
  ICallHangupTo,
  IIceCandidatePayload,
  IIceCandidateResponse,
  IOfferFrom,
  IOfferTo,
} from '@features/user/models/chat/video-chat.model';

@Injectable({
  providedIn: 'root',
})
export class VideoCallService {
  private _socketManger = inject(SocketManagerService);

  isIncomingCall = signal<boolean>(false);

  peerConnection!: RTCPeerConnection;

  // send offer: start call
  sendOffer(offerData: IOfferTo) {
    console.log('sending offer ');

    this._socketManger.emit('offer', offerData);
  }

  // listen for offer event (incomming call)
  onOffer() {
    return this._socketManger.listen<IOfferFrom>('offer');
  }

  // listen for anser event (call accepted)
  onAnswer() {
    return this._socketManger.listen<IAnswerResponse>('answer');
  }

  // listen for ice candidate events
  onIceCandidates() {
    return this._socketManger.listen<IIceCandidateResponse>('iceCandidates');
  }

  // emit ice candidates
  emitIceCandidates(candidate: IIceCandidatePayload) {
    this._socketManger.emit('iceCandidates', candidate);
  }

  sendAnswer(answer: IAnswerPayload) {
    this._socketManger.emit('answer', answer);
  }

  sendCallReject(to: string) {
    this._socketManger.emit('callReject', { to });
  }

  onCallReject() {
    return this._socketManger.listen<{ from: string }>('callReject');
  }

  sendCallHangup(payload: ICallHangupTo) {
    this._socketManger.emit('callHangup', payload);
  }

  onCallHangup() {
    return this._socketManger.listen<ICallHangupFrom>('callHangup');
  }
}
