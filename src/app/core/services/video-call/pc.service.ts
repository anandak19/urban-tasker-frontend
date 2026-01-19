import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PcService {
  peerConnection!: RTCPeerConnection;
  public onIceCandidate: Subject<RTCPeerConnectionIceEvent> =
    new Subject<RTCPeerConnectionIceEvent>();

  private remoteStream = new MediaStream();
  public gotRemoteStream = new Subject<MediaStream>();

  config = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  };

  init(): void {
    console.log('Creating instance');

    this.peerConnection = new RTCPeerConnection(this.config);

    console.log('ICE gathering state:', this.peerConnection.iceGatheringState);

    this.peerConnection.addEventListener('icecandidate', (e) => {
      console.log(
        'Local ICE gathering state:',
        this.peerConnection.iceGatheringState,
      );
      this.onIceCandidate.next(e);
    });

    this.peerConnection.addEventListener('track', (e) => {
      console.log('Got remote track:', e.track.kind);

      this.remoteStream.addTrack(e.track);

      this.gotRemoteStream.next(this.remoteStream);
    });

    this.peerConnection.onconnectionstatechange = () => {
      console.log('connectionState:', this.peerConnection.connectionState);
    };

    this.peerConnection.oniceconnectionstatechange = () => {
      console.log(
        'iceConnectionState:',
        this.peerConnection.iceConnectionState,
      );
    };

    this.peerConnection.onicegatheringstatechange = () => {
      console.log('iceGatheringState:', this.peerConnection.iceGatheringState);
    };

    this.peerConnection.ontrack = (e) => {
      console.log('Remote track received', e.streams);
    };
  }

  // Add Track
  public addTrack(stream: MediaStream): void {
    console.log('adding track ');
    stream.getTracks().forEach((track) => {
      this.pc.addTrack(track, stream);
    });
  }

  private pendingIceCandidates: RTCIceCandidate[] = [];

  addRemoteIceCandidates(candidate: RTCIceCandidateInit) {
    console.log('Addming remote ice candidate');

    const iceCandidate = new RTCIceCandidate(candidate);

    if (this.pc.remoteDescription) {
      console.log('Adding remote ICE immediately');
      this.pc.addIceCandidate(iceCandidate);
    } else {
      console.log('Queueing remote ICE');
      this.pendingIceCandidates.push(iceCandidate);
    }
  }

  flushPendingIceCandidates() {
    this.pendingIceCandidates.forEach((c) => {
      console.log('Fleshing pending candidates');
      this.pc.addIceCandidate(c);
    });
    this.pendingIceCandidates = [];
  }

  // [OFFER -OUT]
  /**
   * Create Offer on peerConnection
   * Set the offer as local discription
   * @returns offer - offer that is created
   */
  public async createOffer() {
    console.log('Creating offer');
    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);
    return offer;
  }

  // [OFFER -IN]
  /**
   * On Remote offer
   * Set the offer as remote discription on peerConnection
   * Create answer
   * set the answer in local discription
   * @param offer
   * @returns answer - answer that is created
   */
  public async handleOffer(
    offer: RTCSessionDescriptionInit,
  ): Promise<RTCSessionDescriptionInit> {
    await this.pc.setRemoteDescription(new RTCSessionDescription(offer));
    this.flushPendingIceCandidates();
    const answer = await this.pc.createAnswer();
    await this.pc.setLocalDescription(answer);
    return answer;
  }

  // [ANSWER -IN]
  /**
   * On Answer from the remote
   * set the answer as remote discription
   * @param answer
   */
  public handleAnswer(answer: RTCSessionDescriptionInit): void {
    this.pc
      .setRemoteDescription(new RTCSessionDescription(answer))
      .then(() => this.flushPendingIceCandidates());
  }

  // close the peerConnection
  public close() {
    this.pc.close();
  }

  get pc(): RTCPeerConnection {
    return this.peerConnection;
  }
}
