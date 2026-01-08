import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ITaskerTask } from '@features/tasker/modals/tasks.model';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-task-card-tasker',
  imports: [ButtonComponent, DatePipe],
  templateUrl: './task-card-tasker.component.html',
  styleUrl: './task-card-tasker.component.scss',
})
export class TaskCardTaskerComponent {
  @Input() taskData!: ITaskerTask;
}
