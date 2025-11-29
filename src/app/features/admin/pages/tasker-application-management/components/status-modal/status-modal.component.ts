import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownFieldComponent } from '@shared/components/dropdown-field/dropdown-field.component';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { IDropdownOption } from '@shared/models/form-inputs.model';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  IApplicationStatusInfo,
  ITaskerApplication,
} from '@shared/models/tasker-applications.model';
import { IApplicationStatusInfoForm } from '@features/admin/models/tasker-application.model';
import { TaskerApplicationStatus } from '@shared/constants/enums/application-status.enum';
import { TaskerApplicationManagementService } from '@features/admin/services/tasker-application-management/tasker-application-management.service';

@Component({
  selector: 'app-status-modal',
  imports: [
    ReactiveFormsModule,
    DropdownFieldComponent,
    DropdownComponent,
    FormFieldWrapperComponent,
    ButtonLoadingComponent,
    ButtonComponent,
  ],
  templateUrl: './status-modal.component.html',
  styleUrl: './status-modal.component.scss',
})
export class StatusModalComponent implements OnInit {
  statusForm!: FormGroup;
  private _taskerApplication = inject(TaskerApplicationManagementService);
  private _fb = inject(FormBuilder);
  private data: ITaskerApplication = inject(DIALOG_DATA);
  private _dialog = inject(DialogRef, { optional: true });

  options = signal<IDropdownOption[]>([
    {
      id: 'pending',
      label: 'Pending',
    },
    {
      id: 'approved',
      label: 'Approved',
    },
    {
      id: 'rejected',
      label: 'Rejected',
    },
  ]);

  initForm() {
    this.statusForm = this._fb.group({
      applicationStatus: [
        this.toStatusOption(this.data.applicationStatus),
        [Validators.required],
      ],
      adminFeedback: [this.data.adminFeedback],
    });
  }

  toStatusOption(status: string) {
    return {
      id: status,
      label: status.charAt(0).toUpperCase() + status.slice(1),
    };
  }

  close(isRefresh?: boolean) {
    this._dialog?.close(isRefresh);
  }

  submit() {
    if (this.statusForm.valid) {
      const formData: IApplicationStatusInfoForm = this.statusForm.value;
      const applicationStatusInfo: IApplicationStatusInfo = {
        adminFeedback: formData.adminFeedback?.trim() ?? '',
        applicationStatus: formData.applicationStatus
          .id as TaskerApplicationStatus,
      };

      this._taskerApplication
        .changeApplicationStatus(this.data.id, applicationStatusInfo)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.close(res.success);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  ngOnInit(): void {
    this.initForm();
    console.log('Form init');
    console.log('Dialog data:', this.data);
  }
}
