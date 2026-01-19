import { inject, Injectable, signal } from '@angular/core';
import { SocketManagerService } from '../socket-manager/socket-manager.service';
import {
  IAnswerPayload,
  IAnswerResponse,
  IIceCandidatePayload,
  IIceCandidateResponse,
  IOfferPayload,
  IOfferResponse,
} from '@features/user/pages/chat/components/sample-video-call/sample-video-call.component';

@Injectable({
  providedIn: 'root',
})
export class VideoCallService {
  private _socketManger = inject(SocketManagerService);

  isIncomingCall = signal<boolean>(false);

  peerConnection!: RTCPeerConnection;

  // send offer: start call
  sendOffer(offerData: IOfferPayload) {
    console.log('sending offer ');

    this._socketManger.emit('offer', offerData);
  }

  // listen for offer event (incomming call)
  onOffer() {
    return this._socketManger.listen<IOfferResponse>('offer');
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

  listenToIncomingOffer() {
    this.onOffer().subscribe({
      next: (offerData) => {
        console.log('Incoming offer from ', offerData.from);
      },
    });
  }
}
