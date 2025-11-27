import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { TaskerApplicationManagementService } from '@features/admin/services/tasker-application-management/tasker-application-management.service';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { TaskerApplicationDataComponent } from '@shared/components/feature/tasker-application-data/tasker-application-data.component';
import { ITaskerApplication } from '@shared/models/tasker-applications.model';

@Component({
  selector: 'app-view-one-tasker-application',
  imports: [
    AdminPageTitleComponent,
    BackButtonComponent,
    TaskerApplicationDataComponent,
  ],
  templateUrl: './view-one-tasker-application.component.html',
  styleUrl: './view-one-tasker-application.component.scss',
})
export class ViewOneTaskerApplicationComponent implements OnInit {
  @Input() applicationId!: string;

  taskerApplicationData = signal<ITaskerApplication | null>(null);

  private _taskerApplicationManagement = inject(
    TaskerApplicationManagementService,
  );

  getApplicationData() {
    this._taskerApplicationManagement
      .findOneApplicationById(this.applicationId)
      .subscribe({
        next: (res) => {
          this.taskerApplicationData.set(res.data);
        },
      });
  }

  ngOnInit(): void {
    console.log(this.applicationId);
    this.getApplicationData();
  }
}
