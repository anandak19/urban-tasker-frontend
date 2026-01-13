import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IBookingDetails } from '@shared/models/booking.model';

@Component({
  selector: 'app-task-timings-box',
  imports: [DatePipe],
  templateUrl: './task-timings-box.component.html',
  styleUrl: './task-timings-box.component.scss',
})
export class TaskTimingsBoxComponent {
  @Input() taskData!: IBookingDetails | null;
}
