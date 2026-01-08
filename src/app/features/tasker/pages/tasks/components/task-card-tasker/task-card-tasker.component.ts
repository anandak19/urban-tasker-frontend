import { DatePipe } from '@angular/common';
import { Component, DestroyRef, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { ITaskerTask } from '@features/tasker/modals/tasks.model';
import { TaskService } from '@features/tasker/services/tasks/task.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { TaskStatus } from '@shared/constants/enums/task-size.enum';
import { IApiResponseError } from '@shared/models/api-response.model';

@Component({
  selector: 'app-task-card-tasker',
  imports: [ButtonComponent, DatePipe],
  templateUrl: './task-card-tasker.component.html',
  styleUrl: './task-card-tasker.component.scss',
})
export class TaskCardTaskerComponent {
  @Input() taskData!: ITaskerTask;
  taskStatus = TaskStatus;

  private _taskService = inject(TaskService);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);

  rejectTask(taskId: string) {
    this._taskService
      .rejectTask(taskId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.taskData.taskStatus = this.taskStatus.REJECTED;
          this._snackbar.success(res.message);
        },
        error: (res: IApiResponseError) => {
          this._snackbar.error(res.message);
        },
      });
  }

  acceptTask(taskId: string) {
    this._taskService
      .acceptTask(taskId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.taskData.isAccepted = true;
          this._snackbar.success(res.message);
        },
        error: (res: IApiResponseError) => {
          this._snackbar.error(res.message);
        },
      });
  }
}
