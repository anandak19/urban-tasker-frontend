import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { CallStateService } from '@core/services/video-call/call-state.service';
import { PcService } from '@core/services/video-call/pc.service';
import { VideoCallService } from '@core/services/video-call/video-call.service';
import {
  IAnswerPayload,
  IIceCandidatePayload,
  IOfferTo,
} from '@features/user/models/chat/video-chat.model';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-video-call',
  imports: [MatIconModule, ButtonComponent],
  templateUrl: './video-call.component.html',
  styleUrl: './video-call.component.scss',
  providers: [PcService],
})
export class VideoCallComponent implements OnInit {
  @ViewChild('localVideo') localVideo!: ElementRef;
  private _remoteVideoEl?: HTMLVideoElement;

  @ViewChild('remoteVideo')
  set remoteVideoSetter(el: ElementRef<HTMLVideoElement>) {
    if (!el) return;

    this._remoteVideoEl = el.nativeElement;

    if (this.remoteStream) {
      this._remoteVideoEl.srcObject = this.remoteStream;
    }
  }

  localStrem!: MediaStream;
  remoteStream!: MediaStream;

  isConnected = signal<boolean>(false);

  private _pcService = inject(PcService);
  private _videoCallService = inject(VideoCallService);
  private _callStateService = inject(CallStateService);
  private _router = inject(Router);
  private _snackbar = inject(SnackbarService);

  // handle local ice candidates
  handleLocalIceCandidates(event: RTCPeerConnectionIceEvent) {
    console.log('handleLocalIceCandidates');

    if (event.candidate) {
      const payload: IIceCandidatePayload = {
        candidate: event.candidate,
        to: this._callStateService.toUserId!,
      };

      // call the socket metho to emit candidate with payload here
      this._videoCallService.emitIceCandidates(payload);
    }
  }

  // handle remote ice candidate emits
  onRemoteIceCandidates() {
    console.log('onRemoteIceCandidates');

    this._videoCallService.onIceCandidates().subscribe({
      next: (res) => {
        console.log('Ice candidated from remote is recived');
        this._pcService.addRemoteIceCandidates(res.candidate);
      },
    });
  }

  // listen to answer event
  onAnswer() {
    this._videoCallService.onAnswer().subscribe({
      next: (res) => {
        console.log('Got anser from ', res.from);
        this._pcService.handleAnswer(res.answer);
      },
    });
  }

  onCallReject() {
    this._videoCallService.onCallReject().subscribe({
      next: (from) => {
        console.log('call rejected by user with id ', from);
        this.cleanup();
        this._snackbar.info('Call is rejected');
      },
    });
  }

  cleanup() {
    this._router.navigate(['/chat']);
    this._pcService.cleanup();
    this.localStrem.getTracks().forEach((t) => t.stop());

    if (this._remoteVideoEl) {
      this._remoteVideoEl.srcObject = null;
    }
    this.localVideo.nativeElement.srcObject = null;
  }

  // on offer
  onOffer() {
    this._videoCallService.onOffer().subscribe({
      next: async (offerData) => {
        console.log('Offer Arrived from : ', offerData.from);
        this.initPc();

        // get my media and add track
        await this.getLocalStrem();

        const answer = await this._pcService.handleOffer(offerData.offer);

        // send answer
        const answerPayload: IAnswerPayload = {
          answer,
          to: offerData.from.id,
        };
        this._videoCallService.sendAnswer(answerPayload);
      },
    });
  }

  initPc() {
    this._pcService.init();

    // on ice candidates, send that to userB
    this._pcService.onIceCandidate.subscribe((c) =>
      this.handleLocalIceCandidates(c),
    );

    this.onRemoteIceCandidates();
  }

  onRemoteStrem() {
    this._pcService.gotRemoteStream.subscribe((stream) => {
      this.remoteStream = stream;
      this.isConnected.set(true);
    });
  }

  // show local stream on view
  showLocalStrem(stream: MediaStream) {
    console.log('Received local stream');
    this.localVideo.nativeElement.srcObject = stream;
  }

  /**
   * Gets local media strem
   * show stream to view
   * add sream and track to RTC instance
   */
  async getLocalStrem() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    this.localStrem = stream;

    this.showLocalStrem(stream);
    this._pcService.addTrack(stream);
  }

  hangup() {
    this._videoCallService.sendCallHangup({
      to: { id: this._callStateService.toUserId! },
    });
    this.cleanup();
    this._pcService.close();
    this._snackbar.info('Call ended');
  }

  onCallHangup() {
    this._videoCallService.onCallHangup().subscribe({
      next: (data) => {
        this.cleanup();
        this._pcService.close();
        this._snackbar.info(`Call disconneted by ${data.from.name || 'User'}`);
      },
    });
  }

  async startAsCaller() {
    // caller logic
    this.initPc();

    await this.getLocalStrem();

    const offer = await this._pcService.createOffer();
    const offerData: IOfferTo = {
      to: { id: this._callStateService.toUserId! },
      offer,
    };
    this._videoCallService.sendOffer(offerData);

    this.onCallReject();
  }

  async startAsCalee() {
    // calee logic
    this.initPc();

    await this.getLocalStrem();

    const answer = await this._pcService.handleOffer(
      this._callStateService.offer!,
    );

    const answerPayload: IAnswerPayload = {
      answer,
      to: this._callStateService.toUserId!,
    };

    this._videoCallService.sendAnswer(answerPayload);
  }

  async ngOnInit() {
    // this.onOffer();
    this.onAnswer();
    this.onRemoteStrem();
    this.onCallHangup();
    if (this._callStateService.mode === 'caller') {
      console.log('to caller details');
      console.log(this._callStateService.toUserId);

      await this.startAsCaller();
    } else if (this._callStateService.mode === 'callee') {
      console.log('from caller details');
      console.log(this._callStateService.toUserId);
      await this.startAsCalee();
    } else {
      this._router.navigate(['/']);
    }
  }

  /**
   * As caller
   * get the user id passed
   * init pc
   * get local strem
   * create offer with user id
   * send offer
   */

  /**
   * As caleee
   * get the offer in call state service
   * init pc
   * get local strem
   * handle offer and create answer
   * send answer
   */

  // async setAsCaller() {}
  // async setAsCallee() {}

  /**
   * INIT PC
   * create instance
   * listen local ice candidates
   * liten on remote ice candidates
   */

  /**
   * START CALL METHODS
   * 1. call initPc
   * 4. call getLocalStrem (await)
   * 5. create offer -> offer payload. Send offer
   */

  /**
   * NG ON INIT METHODS
   * 1. call onOffer
   * 2. call onAnswer
   * 2. call hhandleRemoteStrem
   */

  /**
   * --onOffer
   * call initPc
   * call getLocalStrem (await)
   * hadle offer and get answer
   * send answer
   */
}
