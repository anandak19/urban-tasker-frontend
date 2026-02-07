import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { IGraphDataItem } from '@features/admin/models/reports.mode';
import { TaskerReportsService } from '@features/tasker/services/reports/tasker-reports.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { IReportFilter } from '@shared/models/report/query-filter.model';
import { Chart } from 'chart.js';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-analytics',
  imports: [FormFieldWrapperComponent, FormsModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  // injections
  private _reportsService = inject(TaskerReportsService);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);
  // variables
  private chart!: Chart;
  startDate!: string | null;
  endDate!: string | null;
  reportFilter = signal<IReportFilter>({});
  // signals
  graphDataResponse = signal<IGraphDataItem[]>([]);
  chartLabels = computed<string[]>(() => {
    return this.graphDataResponse().map((l) => l.month);
  });

  data = computed<number[]>(() => {
    return this.graphDataResponse().map((l) => l.totalEarnings);
  });
  // methods
  onStartDateChange() {
    if (this.startDate) {
      this.reportFilter.update((curr) => ({
        ...curr,
        startDate: this.startDate as string,
      }));

      console.log(typeof this.startDate);
      // call the method to get the graph data with filter here
      this.getGraphData();
    }
  }

  onEndDateChange() {
    if (this.endDate) {
      this.reportFilter.update((curr) => ({
        ...curr,
        endDate: this.endDate as string,
      }));

      console.log(typeof this.endDate);
      this.getGraphData();
      // call the method to get the graph data with filter here
    }
  }

  getGraphData() {
    this._reportsService
      .getEarningsReportData(this.reportFilter())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.graphDataResponse.set(res.data);

          this.chart.data.labels = this.chartLabels();
          this.chart.data.datasets[0].data = this.data();
          this.chart.update();
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  // lifecycle

  ngOnInit(): void {
    this.getGraphData();
  }

  ngAfterViewInit(): void {
    this.chart = new Chart('earnings-chart', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Earnings',
            data: [],
            backgroundColor: '#4f46e5',
            borderColor: '#4338ca',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
