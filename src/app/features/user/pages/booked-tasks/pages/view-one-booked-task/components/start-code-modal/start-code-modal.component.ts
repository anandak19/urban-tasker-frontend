import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { BookingService } from '@features/user/services/bookings/booking.service';
import { IApiResponseError } from '@shared/models/api-response.model';

@Component({
  selector: 'app-start-code-modal',
  imports: [MatIconModule, ButtonComponent, ButtonLoadingComponent],
  templateUrl: './start-code-modal.component.html',
  styleUrl: './start-code-modal.component.scss',
})
export class StartCodeModalComponent implements OnInit {
  private readonly _dialogData = inject<{ bookingId: string }>(DIALOG_DATA);
  private _dialogRef = inject(DialogRef);
  private _snackbar = inject(SnackbarService);
  private _bookingService = inject(BookingService);

  startCode = signal<string>('');

  close() {
    this._dialogRef.close();
  }

  onGetNewcode() {
    console.log(this._dialogData);
    if (this._dialogData.bookingId)
      this._bookingService.getStartCode(this._dialogData.bookingId).subscribe({
        next: (res) => {
          this.startCode.set(res.data.code);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  copyCode(codeEl: HTMLElement) {
    const code = codeEl.innerHTML.trim();
    navigator.clipboard
      .writeText(code)
      .then(() => {
        this._snackbar.success('Text Copied');
      })
      .catch(() => this._snackbar.error('Faild to copy'));
  }

  ngOnInit(): void {
    this.onGetNewcode();
  }
}
