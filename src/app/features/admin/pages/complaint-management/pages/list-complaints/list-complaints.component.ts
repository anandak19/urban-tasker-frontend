import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { IPaginationMeta } from '@features/admin/models/common.interface';
import { ComplaintManagementService } from '@features/admin/services/complaint-managment/complaint-management.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { IListComplaint } from '@shared/models/complaint/complaint.model';
import { IBaseFilters } from '@shared/models/request-data.model';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { AdminTableFiltersComponent } from '@features/admin/components/admin-table-filters/admin-table-filters.component';
import { TableListingComponent } from '@features/admin/components/table-listing/table-listing.component';
import { PaginationComponent } from '@features/admin/components/pagination/pagination.component';
import { IMatColumns } from '@shared/interfaces/table.interface';

@Component({
  selector: 'app-list-complaints',
  imports: [
    AdminPageTitleComponent,
    AdminTableFiltersComponent,
    TableListingComponent,
    PaginationComponent,
  ],
  templateUrl: './list-complaints.component.html',
  styleUrl: './list-complaints.component.scss',
})
export class ListComplaintsComponent implements OnInit {
  complaints = signal<IListComplaint[]>([]);

  pagination = signal<IPaginationMeta>({
    limit: 0,
    page: 1,
    pages: 1,
    total: 0,
  });

  filter = signal<IBaseFilters>({
    page: 1,
    limit: 2, // -----------REMOVE THIS LATER
  });

  //col
  complaintsColumns: IMatColumns[] = [
    { label: 'CMP-ID', key: 'cmpId' },
    { label: 'Raised By', key: 'createdBy' },
    { label: 'Complaint', key: 'complaint' },
    { label: 'Complaint Status', key: 'complaintStatus' },
  ] as const;

  private _complaintManagementService = inject(ComplaintManagementService);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);

  findAllComplaints() {
    this._complaintManagementService
      .findAllComplaints(this.filter())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.complaints.set(res.data.documents);
          this.pagination.set(res.data.meta);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  onPageChange(page: number) {
    this.filter.update((val) => ({
      ...val,
      page,
    }));
    this.findAllComplaints();
  }

  ngOnInit(): void {
    this.findAllComplaints();
  }
}
