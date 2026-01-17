import {
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { ComplaintManagementService } from '@features/admin/services/complaint-managment/complaint-management.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { IComplaintDetails } from '@shared/models/complaint/complaint.model';
import { ComplaintDetailsComponent } from '@shared/components/feature/complaint-details/complaint-details.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { Dialog } from '@angular/cdk/dialog';
import { ChangeComplaintStatusModalComponent } from './components/change-complaint-status-modal/change-complaint-status-modal.component';

@Component({
  selector: 'app-view-one-complaint',
  imports: [ComplaintDetailsComponent, ButtonComponent],
  templateUrl: './view-one-complaint.component.html',
  styleUrl: './view-one-complaint.component.scss',
})
export class ViewOneComplaintComponent implements OnInit {
  @Input() complaintId!: string;
  complaintDetails = signal<IComplaintDetails | null>(null);

  private _complaintManagementService = inject(ComplaintManagementService);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);
  private _dialog = inject(Dialog);

  getComplaintDetails() {
    if (!this.complaintId) return;

    this._complaintManagementService
      .findOneComplaintById(this.complaintId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.complaintDetails.set(res.data);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  onChangeStatusClick() {
    const ref = this._dialog.open<boolean>(
      ChangeComplaintStatusModalComponent,
      {
        data: {
          complaintStatus: this.complaintDetails()?.complaintStatus,
          adminFeedback: this.complaintDetails()?.adminFeedback,
          id: this.complaintDetails()?.id,
        },
      },
    );

    ref.closed.subscribe((isRefresh) => {
      if (isRefresh) {
        this.getComplaintDetails();
      }
    });
  }

  ngOnInit(): void {
    this.getComplaintDetails();
  }
}
