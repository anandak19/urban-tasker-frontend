import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { TaskCardTaskerComponent } from '../../components/task-card-tasker/task-card-tasker.component';
import { ITaskFilter } from '@shared/models/request-data.model';
import { TaskStatus } from '@shared/constants/enums/task-size.enum';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '@features/admin/components/pagination/pagination.component';
import { IPaginationMeta } from '@features/admin/models/common.interface';
import { TaskService } from '@features/tasker/services/tasks/task.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IApiResponseError } from '@shared/models/api-response.model';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { ITaskerTask } from '@features/tasker/modals/tasks.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-tasks',
  imports: [
    PageTitleComponent,
    TaskCardTaskerComponent,
    CommonModule,
    PaginationComponent,
  ],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.scss',
})
export class ListTasksComponent implements OnInit {
  status = TaskStatus;

  // filter = signal<ITaskFilter>({
  //   status: this.status.IN_PROGRESS,
  // });
  filter = signal<ITaskFilter>({});

  tasks = signal<ITaskerTask[]>([]);

  pagination = signal<IPaginationMeta>({
    limit: 0,
    page: 1,
    pages: 1,
    total: 0,
  });

  private _taskService = inject(TaskService);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  onChangeStatusFilter(selectedStatus?: TaskStatus) {
    this.filter.update((current) => {
      const updated = { ...current };

      if (!selectedStatus) {
        delete updated.taskStatus;
        return updated;
      }

      updated.taskStatus = selectedStatus;
      return updated;
    });

    this.getAllTasks();
  }

  handlePageChange(num: number) {
    this.filter.update((curr) => ({ ...curr, page: num }));
    this.getAllTasks();
  }

  getAllTasks() {
    console.log(this.filter());
    this._taskService
      .getAllTasks(this.filter())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res.data);
          this.tasks.set(res.data.documents);
          this.pagination.set(res.data.meta);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  onViewClick(id: string) {
    this._router.navigate([`${id}`], { relativeTo: this._route });
  }

  ngOnInit(): void {
    this.getAllTasks();
  }
}
