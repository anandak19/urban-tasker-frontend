import { inject, Injectable } from '@angular/core';
import { SocketManagerService } from '../socket-manager/socket-manager.service';
import { VideoCallService } from '../video-call/video-call.service';
// import { Dialog } from '@angular/cdk/dialog';
import { IncomingCallModalComponent } from '@shared/components/ui/incoming-call-modal/incoming-call-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CallStateService } from '../video-call/call-state.service';
import { Router } from '@angular/router';
import { IOfferFrom } from '@features/user/models/chat/video-chat.model';

@Injectable({
  providedIn: 'root',
})
export class SignalingService {
  private _socketManager = inject(SocketManagerService);
  private _videoCallService = inject(VideoCallService);
  private _callState = inject(CallStateService);
  private _dialog = inject(MatDialog);
  private _router = inject(Router);

  showIncomingcallModal(data: IOfferFrom) {
    const dialogRef = this._dialog.open<
      IncomingCallModalComponent,
      IOfferFrom,
      boolean
    >(IncomingCallModalComponent, {
      data,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((accepted) => {
      if (accepted) {
        console.log('call accepted');
        this._callState.setCallee(data);
        this._router.navigate(['/chat/call/video']);
      } else {
        console.log('call rejected');
        this._videoCallService.sendCallReject(data.from.id);
      }
    });
  }

  listenToEvents() {
    this._socketManager.onConnect(() => {
      console.log('Listening to after connect events');

      // offer event
      this._videoCallService.onOffer().subscribe({
        next: (offerData) => {
          this.showIncomingcallModal(offerData);
          console.log('offer arived');
        },
      });
    });
  }
}
