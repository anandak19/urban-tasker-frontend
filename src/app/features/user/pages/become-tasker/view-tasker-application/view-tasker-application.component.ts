import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ITaskerApplication } from '@features/user/models/tasker-applications/tasker-applications.model';
import { TaskerApplicationsService } from '@features/user/services/tasker-applications/tasker-applications.service';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { IApiResponseError } from '@shared/models/api-response.model';
import { ButtonComponent } from '@shared/components/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-tasker-application',
  imports: [FormFieldWrapperComponent, CommonModule, ButtonComponent],
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
