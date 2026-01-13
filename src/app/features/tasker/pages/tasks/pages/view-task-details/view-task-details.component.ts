import {
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { TaskService } from '@features/tasker/services/tasks/task.service';
import { BookingService } from '@features/user/services/bookings/booking.service';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { ChatService } from '@features/user/services/chat/chat.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { Router } from '@angular/router';
import { IBookingDetails } from '@shared/models/booking.model';
import { TaskStatusBoxComponent } from '@shared/components/feature/booking-details/task-status-box/task-status-box.component';
import { TaskInfoBoxComponent } from '@shared/components/feature/booking-details/task-info-box/task-info-box.component';
import { RelatedUserBoxComponent } from '@shared/components/feature/booking-details/related-user-box/related-user-box.component';
import { TaskTimingsBoxComponent } from '@shared/components/feature/booking-details/task-timings-box/task-timings-box.component';
import { Dialog } from '@angular/cdk/dialog';
import { StartCodeModalComponent } from './components/start-code-modal/start-code-modal.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { TaskStatus } from '@shared/constants/enums/task-size.enum';
import { PaymentDetailsBoxComponent } from '@shared/components/feature/booking-details/payment-details-box/payment-details-box.component';

@Component({
  selector: 'app-view-task-details',
  imports: [
    PageTitleComponent,
    ButtonLoadingComponent,
    TaskStatusBoxComponent,
    TaskInfoBoxComponent,
    RelatedUserBoxComponent,
    TaskTimingsBoxComponent,
    ButtonComponent,
    BackButtonComponent,
    PaymentDetailsBoxComponent,
  ],
  templateUrl: './view-task-details.component.html',
  styleUrl: './view-task-details.component.scss',
})
export class ViewTaskDetailsComponent implements OnInit {
  @Input() taskId!: string;
  isChatLoading = signal<boolean>(false);
  private _taskService = inject(TaskService);
  private _bookingService = inject(BookingService);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);
  private _chatService = inject(ChatService);
  private _router = inject(Router);
  private _dialog = inject(Dialog);

  bookingDetails = signal<IBookingDetails | null>(null);
  status = TaskStatus;

  getTaskData() {
    console.log(this.taskId);

    this._bookingService.getOneBooking(this.taskId).subscribe({
      next: (res) => {
        console.log(res);
        this.bookingDetails.set(res.data);
      },
      error: (err: IApiResponseError) => {
        this._snackbar.error(err.message);
      },
    });
  }

  onChatWithUserClick() {
    if (this.bookingDetails()?.userId) {
      this.isChatLoading.set(true);
      this._chatService
        .getChatRoomId(this.bookingDetails()!.userId)
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

  onStartTaskClick() {
    if (!this.bookingDetails()?.id) return;

    const dialogRef = this._dialog.open<
      { isRefresh: boolean },
      { taskId: string }
    >(StartCodeModalComponent, {
      data: { taskId: this.bookingDetails()!.id },
    });

    dialogRef.closed.subscribe((result) => {
      if (result?.isRefresh) {
        this.getTaskData();
      }
    });
  }

  resumeTask() {
    if (!this.bookingDetails()?.id) return;
    const taskId = this.bookingDetails()!.id;

    this._taskService
      .resumeTask(taskId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this._snackbar.success(res.message);
          this.getTaskData();
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  takeBreak() {
    if (!this.bookingDetails()?.id) return;
    const taskId = this.bookingDetails()!.id;

    this._taskService
      .takeBreak(taskId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this._snackbar.success(res.message);
          this.getTaskData();
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  onFinish() {
    if (!this.bookingDetails()?.id) return;
    const taskId = this.bookingDetails()!.id;
    //logic
    this._taskService
      .finishTask(taskId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.getTaskData();
          this._snackbar.success(res.message);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  ngOnInit(): void {
    this.getTaskData();
  }
}
