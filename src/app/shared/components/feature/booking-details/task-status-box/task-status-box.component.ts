import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TaskStatus } from '@shared/constants/enums/task-size.enum';

@Component({
  selector: 'app-task-status-box',
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './task-status-box.component.html',
  styleUrl: './task-status-box.component.scss',
})
export class TaskStatusBoxComponent {
  @Input() taskStatus!: TaskStatus | null;
  status = TaskStatus;

  get chipClass() {
    if (this.taskStatus) {
      switch (this.taskStatus) {
        case this.status.PENDING:
          return 'task-status-box__chip--pending';
      }
    }
    return '';
  }
}
