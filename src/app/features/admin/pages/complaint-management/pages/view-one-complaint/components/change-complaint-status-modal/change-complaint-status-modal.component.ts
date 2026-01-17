import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownFieldComponent } from '@shared/components/dropdown-field/dropdown-field.component';
import { ComplaintStatus } from '@shared/constants/enums/complaint-status.enum';
import { IOptionData } from '@shared/models/form-inputs.model';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { IChangeComplaintStatus } from '@features/admin/models/complaint.model';
import { ComplaintManagementService } from '@features/admin/services/complaint-managment/complaint-management.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IApiResponseError } from '@shared/models/api-response.model';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-change-complaint-status-modal',
  imports: [
    DropdownFieldComponent,
    ReactiveFormsModule,
    DropdownComponent,
    FormFieldWrapperComponent,
    ButtonLoadingComponent,
    ButtonComponent,
  ],
  templateUrl: './change-complaint-status-modal.component.html',
  styleUrl: './change-complaint-status-modal.component.scss',
})
export class ChangeComplaintStatusModalComponent implements OnInit {
  statusForm!: FormGroup;

  options = signal<IOptionData[]>([
    {
      id: ComplaintStatus.PENDING,
      label: 'Pending',
    },
    {
      id: ComplaintStatus.REJECTED,
      label: 'Rejected',
    },
    {
      id: ComplaintStatus.RESOLVED,
      label: 'Resolved',
    },
  ]);

  private _dialog = inject(DialogRef, { optional: true });
  private data: IChangeComplaintStatus & { id: string } = inject(DIALOG_DATA);
  private _fb = inject(FormBuilder);
  private _complaintManagement = inject(ComplaintManagementService);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);

  changeStatus(update: IChangeComplaintStatus) {
    console.log(update);
    this._complaintManagement
      .changeStatus(this.data.id, update)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);
          this._snackbar.success(res.message);
          this.close(true);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  submit() {
    //sub
    if (this.statusForm.valid) {
      const formData = this.statusForm.value;

      const complaintStatusData: IChangeComplaintStatus = {
        adminFeedback: formData.adminFeedback?.trim() ?? '',
        complaintStatus: formData.applicationStatus.id as ComplaintStatus,
      };

      this.changeStatus(complaintStatusData);
    }
  }

  close(isRefresh?: boolean) {
    this._dialog?.close(isRefresh);
  }

  initForm() {
    this.statusForm = this._fb.group({
      applicationStatus: [
        this.toStatusOption(this.data.complaintStatus),
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

  ngOnInit(): void {
    this.initForm();
  }
}
