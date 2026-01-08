import {
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IBooking } from '@features/user/models/tasker-bookings/tasker-bookings.model';
import { BookingService } from '@features/user/services/bookings/booking.service';
import { TaskSize, TaskStatus } from '@shared/constants/enums/task-size.enum';
import { IApiResponseError } from '@shared/models/api-response.model';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { IOptionData } from '@shared/models/form-inputs.model';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { ChatService } from '@features/user/services/chat/chat.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-one-booked-task',
  imports: [
    PageTitleComponent,
    TitleCasePipe,
    DatePipe,
    DropdownComponent,
    ButtonLoadingComponent,
  ],
  templateUrl: './view-one-booked-task.component.html',
  styleUrl: './view-one-booked-task.component.scss',
})
export class ViewOneBookedTaskComponent implements OnInit {
  @Input() taskId!: string;

  isChatLoading = signal<boolean>(false);
  bookingDetails = signal<IBooking | null>(null);

  private _bookingService = inject(BookingService);
  private _chatService = inject(ChatService);
  private _snackbar = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);

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

  sampleBooking: IBooking = {
    categoryName: 'Cleaning',
    city: 'kochi',
    date: '2026-01-08T18:30:00.000Z',
    time: '09:30',
    description: 'Need a experienced worker to clen my dishes',
    subcategoryId: '6920af181b0733a42ffac2d7',
    id: '695e8b5deb1f0469910c02c9',
    taskerFirstName: 'Sharon',
    taskerLastName: 'M',
    taskSize: TaskSize.SMALL,
    taskStatus: TaskStatus.PENDING,
    taskerId: '695e8838eb1f0469910c020a',
    image:
      'https://www.ricoh-imaging.co.jp/english/products/q-s1/ex/img/bod_mainImg_01.jpg',
  };

  statusOptions = signal<IOptionData[]>([
    {
      id: TaskStatus.PENDING,
      label: 'Pending',
    },
    {
      id: TaskStatus.IN_PROGRESS,
      label: 'In Progress',
    },
    {
      id: TaskStatus.COMPLETED,
      label: 'Completed',
    },
  ]);

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

  ngOnInit(): void {
    console.log(this.taskId);
    this.getBookingDetails();
    // this.bookingDetails.set(this.sampleBooking);
  }
}
