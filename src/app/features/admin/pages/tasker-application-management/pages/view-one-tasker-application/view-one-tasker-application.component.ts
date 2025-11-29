import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { TaskerApplicationManagementService } from '@features/admin/services/tasker-application-management/tasker-application-management.service';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { TaskerApplicationDataComponent } from '@shared/components/feature/tasker-application-data/tasker-application-data.component';
import { ITaskerApplication } from '@shared/models/tasker-applications.model';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { Dialog } from '@angular/cdk/dialog';
import { StatusModalComponent } from '../../components/status-modal/status-modal.component';

@Component({
  selector: 'app-view-one-tasker-application',
  imports: [
    AdminPageTitleComponent,
    BackButtonComponent,
    TaskerApplicationDataComponent,
    FormFieldWrapperComponent,
    ButtonComponent,
  ],
  templateUrl: './view-one-tasker-application.component.html',
  styleUrl: './view-one-tasker-application.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewOneTaskerApplicationComponent implements OnInit {
  @Input() applicationId!: string;

  taskerApplicationData = signal<ITaskerApplication | null>(null);
  private _dialog = inject(Dialog);

  private _taskerApplicationManagement = inject(
    TaskerApplicationManagementService,
  );

  onChangeStatus() {
    const dialogRef = this._dialog.open(StatusModalComponent, {
      disableClose: true,
      width: '450px',
      data: this.taskerApplicationData(),
    });

    dialogRef.closed.subscribe((statusChanged) => {
      if (statusChanged) {
        this.getApplicationData();
      }
    });
  }

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
    this.getApplicationData();
  }
}
