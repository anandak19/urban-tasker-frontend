import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskerApplicationsService } from '@features/user/services/tasker-applications/tasker-applications.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { ButtonComponent } from '@shared/components/button/button.component';
import { TaskerApplicationDataComponent } from '@shared/components/feature/tasker-application-data/tasker-application-data.component';
import { Router } from '@angular/router';
import { ITaskerApplication } from '@shared/models/tasker-applications.model';

@Component({
  selector: 'app-view-tasker-application',
  imports: [CommonModule, ButtonComponent, TaskerApplicationDataComponent],
  templateUrl: './view-tasker-application.component.html',
  styleUrl: './view-tasker-application.component.scss',
})
export class ViewTaskerApplicationComponent implements OnInit {
  private _taskerApplication = inject(TaskerApplicationsService);
  private _router = inject(Router);

  taskerApplicationData = signal<ITaskerApplication | null>(null);

  isTaskerApplied = signal<boolean>(false);

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this._taskerApplication.findLoggedInUsersApplication().subscribe({
      next: (res) => {
        this.isTaskerApplied.set(true);
        this.taskerApplicationData.set(res.data);
      },
      error: (err: IApiResponseError) => {
        console.log(err);
      },
    });
  }

  navigateToForm() {
    this._router.navigate(['tasker/application/apply']);
  }
}
