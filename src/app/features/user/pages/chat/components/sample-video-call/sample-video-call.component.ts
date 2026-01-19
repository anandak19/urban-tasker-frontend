import {
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PcService } from '@core/services/video-call/pc.service';
import { VideoCallService } from '@core/services/video-call/video-call.service';
import { ButtonComponent } from '@shared/components/button/button.component';

export interface IOfferPayload {
  offer: RTCSessionDescriptionInit;
  to: string;
}

export interface IOfferResponse extends Pick<IOfferPayload, 'offer'> {
  from: string;
}

export interface IAnswerPayload {
  answer: RTCSessionDescriptionInit;
  to: string;
}

export interface IAnswerResponse extends Pick<IAnswerPayload, 'answer'> {
  from: string;
}

export interface IIceCandidatePayload {
  candidate: RTCIceCandidateInit;
  to: string;
}

export interface IIceCandidateResponse
  extends Pick<IIceCandidatePayload, 'candidate'> {
  from: string;
}

@Component({
  selector: 'app-sample-video-call',
  imports: [ButtonComponent],
  templateUrl: './sample-video-call.component.html',
  styleUrl: './sample-video-call.component.scss',
  providers: [PcService],
})
export class SampleVideoCallComponent implements OnInit {
  @Input() toUserId!: string;

  @ViewChild('localVideo') localVideo!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;

  localStrem!: MediaStream;

  private _videoCallService = inject(VideoCallService);
  private _pcService = inject(PcService);

  handleLocalIceCandidates(event: RTCPeerConnectionIceEvent) {
    if (event.candidate) {
      const payload: IIceCandidatePayload = {
        candidate: event.candidate,
        to: this.toUserId,
      };

      // call the socket metho to emit candidate with payload here
      this._videoCallService.emitIceCandidates(payload);
    }
  }

  gotRemoteStream(e: RTCTrackEvent) {
    if (this.remoteVideo.nativeElement.srcObject !== e.streams[0]) {
      console.log('Received remote stream');
      this.remoteVideo.nativeElement.srcObject = e.streams[0];
      console.log('showing remote stream');
    }
  }

  initPc() {
    this._pcService.init();

    // on ice candidates, send that to userB
    this._pcService.onIceCandidate.subscribe((c) =>
      this.handleLocalIceCandidates(c),
    );

    // when got Track add that to remote strem
    this._pcService.gotRemoteStream.subscribe((stream) => {
      if (this.remoteVideo.nativeElement.srcObject !== stream) {
        console.log('Caller attaching remote stream');
        this.remoteVideo.nativeElement.srcObject = stream;
      }
    });
  }

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

  async startCall() {
    console.log(`Calling user with user id: ${this.toUserId}`);
    this.initPc();

    // set remote ice/ remote ice candidates event
    this._videoCallService.onIceCandidates().subscribe({
      next: (res) => {
        console.log('Got ICe from remote');
        this._pcService.addRemoteIceCandidates(res.candidate);
      },
    });

    // listen to answer
    this._videoCallService.onAnswer().subscribe({
      next: (res) => {
        console.log('Got anser from ', res.from);
        this._pcService.handleAnswer(res.answer);
      },
    });

    await this.getLocalStrem(); // audio/video

    const offer = await this._pcService.createOffer();
    console.log('Offer created is');
    console.log(offer);
    const offerData: IOfferPayload = {
      to: this.toUserId,
      offer,
    };

    this._videoCallService.sendOffer(offerData);
  }

  hangup() {
    this._pcService.close();
  }

  ngOnInit(): void {
    console.log('init');
    // listen to offer
    this._videoCallService.onOffer().subscribe({
      next: async (offerData) => {
        console.log('Offer Arrived from : ', offerData.from);
        this._pcService.init(); // initialze RTC intance
        //local ice candidates
        this._pcService.onIceCandidate.subscribe((c) =>
          this.handleLocalIceCandidates(c),
        );

        // get my media and add track
        await this.getLocalStrem();

        const answer = await this._pcService.handleOffer(offerData.offer);

        // send answer
        const answerPayload: IAnswerPayload = {
          answer,
          to: offerData.from,
        };
        this._videoCallService.sendAnswer(answerPayload);
      },
    });

    // this.initLocalMedia();
    // if (this.peerConnection) {
    //   this.initSocketEvents();
    //   this.startCall();
    // }
    this._videoCallService.onIceCandidates().subscribe({
      next: (res) => {
        console.log('Ice candidated from remote is recived');
        this._pcService.addRemoteIceCandidates(res.candidate);
      },
    });

    this._pcService.gotRemoteStream.subscribe((stream) => {
      if (this.remoteVideo.nativeElement.srcObject !== stream) {
        console.log('Attaching remote stream');
        this.remoteVideo.nativeElement.srcObject = stream;
      }
    });
  }

  /**
   * New Plan
   * ---1. On User Click Call
   * > Get the local media strem and add that to view and add that to pc using addTrack
   * Create instance of pc (it will create instance and then register events for: iceCandidates, stream)
   * Create offer (it will create offer and set the offer as local discription)
   * Emit offer event via socket to signel server
   * > 1.1
   * listen for answer event : on anser save that to remote discription only
   * listen for remote track, as soon as i get it add that to view
   *
   * ---2. Normal user setup (for calee)
   * on init the page create the instance of pc (it will create instance and then register events for: iceCandidates, stream)
   * Listen for offer events (when offer arrives, set that to remote discription on pc)(then create answer and emit that (set that anser as local discription here))
   * > Get the local media strem and add that to view and add that to pc using addTrack
   * listen for remote track, as soon as i get it add that to view
   *
   *------------------------------------------------------------
   * ---on call-page ngOnInit methods
   *  subscribe listen for ice candidates from pc service and call handle them of data (method will emit candidate event with candidate)
   *  subscribe remote stream event from pc and call handle them on data: (on strem add that to view)
   *
   * ---on ngAfterViewInit methods
   *  call the listen for offers on socket
   */
}
