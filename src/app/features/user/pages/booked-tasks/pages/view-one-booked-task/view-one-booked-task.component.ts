import {
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookingService } from '@features/user/services/bookings/booking.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { ChatService } from '@features/user/services/chat/chat.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { IBookingDetails } from '@shared/models/booking.model';
import { TaskInfoBoxComponent } from '@shared/components/feature/booking-details/task-info-box/task-info-box.component';
import { TaskStatusBoxComponent } from '@shared/components/feature/booking-details/task-status-box/task-status-box.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { TaskTimingsBoxComponent } from '@shared/components/feature/booking-details/task-timings-box/task-timings-box.component';
import { RelatedUserBoxComponent } from '@shared/components/feature/booking-details/related-user-box/related-user-box.component';
import { Dialog } from '@angular/cdk/dialog';
import { StartCodeModalComponent } from './components/start-code-modal/start-code-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskStatus } from '@shared/constants/enums/task-size.enum';
import { PaymentDetailsBoxComponent } from '@shared/components/feature/booking-details/payment-details-box/payment-details-box.component';

@Component({
  selector: 'app-view-one-booked-task',
  imports: [
    PageTitleComponent,
    ButtonLoadingComponent,
    TaskInfoBoxComponent,
    TaskStatusBoxComponent,
    ButtonComponent,
    TaskTimingsBoxComponent,
    RelatedUserBoxComponent,
    MatDialogModule,
    PaymentDetailsBoxComponent,
  ],
  templateUrl: './view-one-booked-task.component.html',
  styleUrl: './view-one-booked-task.component.scss',
})
export class ViewOneBookedTaskComponent implements OnInit {
  @Input() taskId!: string;

  isChatLoading = signal<boolean>(false);
  bookingDetails = signal<IBookingDetails | null>(null);
  status = TaskStatus;

  private _bookingService = inject(BookingService);
  private _chatService = inject(ChatService);
  private _snackbar = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);
  private _dialog = inject(Dialog);

  getBookingDetails() {
    this._bookingService
      .getOneBooking(this.taskId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.bookingDetails.set(res.data);
        },
        error: (err: IApiResponseError) => {
          console.log(err);
        },
      });
  }

  /**
   * Get chat room id and navigate to /chat
   * with room id
   */
  onChatWithTaskerClick() {
    if (this.bookingDetails()?.taskerId) {
      this.isChatLoading.set(true);
      this._chatService
        .getChatRoomId(this.bookingDetails()!.taskerId)
        .pipe(
          finalize(() => this.isChatLoading.set(false)),
          takeUntilDestroyed(this._destroyRef),
        )
        .subscribe({
          next: (res) => {
            console.log(res.data);
            this._router.navigate(['/chat', res.data.roomId]);
          },
          error: (err: IApiResponseError) => {
            this._snackbar.error(err.message);
          },
        });
    }
  }

  onStartCode() {
    this._dialog.open(StartCodeModalComponent, {
      data: {
        bookingId: this.taskId,
      },
    });
  }

  onPay() {
    alert('Method not implemented');
  }

  ngOnInit(): void {
    console.log(this.taskId);
    this.getBookingDetails();
    // this.bookingDetails.set(this.sampleBooking);
  }
}
