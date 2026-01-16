import {
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { ComplaintFormComponent } from './components/complaint-form/complaint-form.component';
import { ComplaintDetailsComponent } from '@shared/components/feature/complaint-details/complaint-details.component';
import { ComplaintService } from '@features/user/services/complaints/complaint.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IApiResponseError } from '@shared/models/api-response.model';
import { finalize } from 'rxjs';
import { LoadingComplaintComponent } from './components/loading-complaint/loading-complaint.component';
import { IComplaintDetails } from '@shared/models/complaint/complaint.model';

@Component({
  selector: 'app-tasks-complaint',
  imports: [
    ComplaintFormComponent,
    ComplaintDetailsComponent,
    LoadingComplaintComponent,
  ],
  templateUrl: './tasks-complaint.component.html',
  styleUrl: './tasks-complaint.component.scss',
})
export class TasksComplaintComponent implements OnInit {
  @Input() taskId!: string;
  private _complaintService = inject(ComplaintService);
  private _destroyRef = inject(DestroyRef);

  isComplaintLoading = signal<boolean>(true);
  isComplaintRaised = signal<boolean>(false);

  complaintDetails = signal<IComplaintDetails | null>(null);

  findTaskComplaint() {
    if (!this.taskId) return;
    this._complaintService
      .findComplaintByTaskId(this.taskId)
      .pipe(
        finalize(() => this.isComplaintLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: (res) => {
          this.isComplaintRaised.set(true);
          this.complaintDetails.set(res.data);
        },
        error: (err: IApiResponseError) => {
          console.log(err);
          this.isComplaintRaised.set(false);
        },
      });
  }

  ngOnInit(): void {
    this.findTaskComplaint();
  }
}
