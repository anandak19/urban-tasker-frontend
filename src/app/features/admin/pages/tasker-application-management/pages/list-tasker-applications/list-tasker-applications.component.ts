import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { AdminTableFiltersComponent } from '@features/admin/components/admin-table-filters/admin-table-filters.component';
import { TableListingComponent } from '@features/admin/components/table-listing/table-listing.component';
import { PaginationComponent } from '@features/admin/components/pagination/pagination.component';
import { TaskerApplicationManagementService } from '@features/admin/services/tasker-application-management/tasker-application-management.service';
import { IMatColumns } from '@shared/interfaces/table.interface';
import { ITaskerApplicationListItem } from '@features/admin/models/tasker-application.model';
import { IPaginationMeta } from '@features/admin/models/common.interface';
import { IBaseFilters } from '@shared/models/request-data.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-tasker-applications',
  imports: [
    AdminPageTitleComponent,
    AdminTableFiltersComponent,
    TableListingComponent,
    PaginationComponent,
  ],
  templateUrl: './list-tasker-applications.component.html',
  styleUrl: './list-tasker-applications.component.scss',
})
export class ListTaskerApplicationsComponent implements OnInit {
  private _taskerApplicationManagement = inject(
    TaskerApplicationManagementService,
  );

  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  filter = signal<IBaseFilters>({
    page: 1,
    limit: 2, // -----------REMOVE THIS LATER
  });

  columns: IMatColumns[] = [
    {
      key: 'firstName',
      label: 'First Name',
    },
    {
      key: 'lastName',
      label: 'Last Name',
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'city',
      label: 'City',
    },
    {
      key: 'hourlyRate',
      label: 'Hourly Rate',
    },
    {
      key: 'applicationStatus',
      label: 'Application Status',
    },
  ];

  applications: ITaskerApplicationListItem[] = [];
  paginationMeta = signal<IPaginationMeta | null>(null);

  onPageChange(page: number) {
    this.filter.update((c) => {
      return { ...c, page };
    });
    this.getApplications();
  }

  onViewClicked(id: string) {
    this._router.navigate([`${id}`], { relativeTo: this._route });
  }

  getApplications() {
    this._taskerApplicationManagement
      .getAllApplications(this.filter())
      .subscribe({
        next: (res) => {
          this.applications = res.data.documents;
          this.paginationMeta.set(res.data.meta);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnInit(): void {
    this.getApplications();
  }
}
