import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IOfferResponse } from '@features/user/models/chat/video-chat.model';

@Component({
  selector: 'app-incoming-call-modal',
  imports: [],
  templateUrl: './incoming-call-modal.component.html',
  styleUrl: './incoming-call-modal.component.scss',
})
export class IncomingCallModalComponent {
  _data: IOfferResponse = inject(MAT_DIALOG_DATA);
  private _dialogRef = inject(
    MatDialogRef<IncomingCallModalComponent, boolean>,
  );

  accept() {
    this._dialogRef.close(true);
  }

  reject() {
    this._dialogRef.close(false);
  }
}
