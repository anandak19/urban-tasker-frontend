import { DatePipe, TitleCasePipe } from '@angular/common';
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
import { IBookingDetails } from '@features/user/models/tasker-bookings/tasker-bookings.model';
import { BookingService } from '@features/user/services/bookings/booking.service';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { ChatService } from '@features/user/services/chat/chat.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task-details',
  imports: [
    PageTitleComponent,
    DatePipe,
    TitleCasePipe,
    ButtonLoadingComponent,
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

  bookingDetails = signal<IBookingDetails | null>(null);

  getTaskData() {
    this._bookingService.getOneBooking(this.taskId).subscribe({
      next: (res) => {
        this.bookingDetails.set(res.data);
      },
    });
  }

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

  ngOnInit(): void {
    this.getTaskData();
  }
}
