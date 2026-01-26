import { CurrencyPipe } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { PaginationComponent } from '@features/admin/components/pagination/pagination.component';
import { TableListingComponent } from '@features/admin/components/table-listing/table-listing.component';
import { IPaginationMeta } from '@features/admin/models/common.interface';
import {
  IBookingSummaryListItem,
  IDashboardSummary,
} from '@features/admin/models/reports.mode';
import { ReportsService } from '@features/admin/services/reports/reports.service';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { BookingGroupBy } from '@shared/constants/enums/filter-enum';
import { IMatColumns } from '@shared/interfaces/table.interface';
import { IApiResponseError } from '@shared/models/api-response.model';
import { IOptionData } from '@shared/models/form-inputs.model';
import { IBaseFilters } from '@shared/models/request-data.model';
import { GraphVisualizationComponent } from './components/graph-visualization/graph-visualization.component';

export interface IBookingSummeryFilter extends IBaseFilters {
  groupBy: BookingGroupBy;
}

@Component({
  selector: 'app-reports',
  imports: [
    AdminPageTitleComponent,
    CurrencyPipe,
    DropdownComponent,
    TableListingComponent,
    PaginationComponent,
    GraphVisualizationComponent,
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent implements OnInit {
  isDisabled = true;

  summeryData = signal<IDashboardSummary | null>(null);
  bookingSummeryData = signal<IBookingSummaryListItem[]>([]);

  filter = signal<IBookingSummeryFilter>({
    page: 1,
    groupBy: BookingGroupBy.CITY,
  });

  pagination = signal<IPaginationMeta>({
    limit: 0,
    page: 1,
    pages: 1,
    total: 0,
  });

  groupByOption = signal<IOptionData[]>([
    {
      id: BookingGroupBy.CATEGORY,
      label: BookingGroupBy.CATEGORY,
    },
    {
      id: BookingGroupBy.CITY,
      label: BookingGroupBy.CITY,
    },
  ]);

  // base columns
  basicBookingsCol: IMatColumns[] = [
    {
      label: 'Total Bookings',
      key: 'bookingsCount',
    },
    {
      label: 'Total Completed',
      key: 'completedCount',
    },
    {
      label: 'Total Earnings',
      key: 'earnings',
    },
  ];
  bookingsTableColumns = computed<IMatColumns[]>(() => {
    const groupBy = this.filter().groupBy;

    const groupColumn =
      groupBy === BookingGroupBy.CATEGORY
        ? { label: 'Category Name', key: 'categoryName' }
        : { label: 'City', key: 'city' };

    return [groupColumn, ...this.basicBookingsCol];
  });

  private _reportService = inject(ReportsService);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);

  onGroupByOptionChange(option: IOptionData) {
    if (option.id === this.filter().groupBy) return;

    const value = option.id as BookingGroupBy;
    this.filter.update((curr) => ({ ...curr, groupBy: value, page: 1 }));
    this.getBookingSummery();
  }

  onBookingSummeryPageChange(page: number) {
    this.filter.update((curr) => ({ ...curr, page: page }));
    this.getBookingSummery();
  }

  getSummeryData() {
    this._reportService
      .getDashboardSummery()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.summeryData.set(res.data);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  getBookingSummery() {
    this._reportService
      .getBookingsSummary(this.filter())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.bookingSummeryData.set(res.data.documents);
          this.pagination.set(res.data.meta);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  ngOnInit(): void {
    this.getSummeryData();
    this.getBookingSummery();
  }
}
