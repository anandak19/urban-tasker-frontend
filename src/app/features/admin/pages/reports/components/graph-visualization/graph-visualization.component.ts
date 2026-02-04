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
import {
  IGraphDataItem,
  INgxGraphDataItem,
} from '@features/admin/models/reports.mode';
import { ReportsService } from '@features/admin/services/reports/reports.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { IReportFilter } from '@shared/models/report/query-filter.model';
import { Chart } from 'chart.js/auto';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';

@Component({
  selector: 'app-graph-visualization',
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    FormFieldWrapperComponent,
  ],
  templateUrl: './graph-visualization.component.html',
  styleUrl: './graph-visualization.component.scss',
})
export class GraphVisualizationComponent implements OnInit, AfterViewInit {
  private _reportsService = inject(ReportsService);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);

  reportFilter = signal<IReportFilter>({});

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

  graphDataResponse = signal<IGraphDataItem[]>([]);
  ngxGraphData = computed<INgxGraphDataItem[]>(() => {
    return this.graphDataResponse().map((item) => ({
      name: item.month,
      value: item.totalEarnings,
    }));
  });

  private chart!: Chart;
  startDate!: string | null;
  endDate!: string | null;

  chartLabels = computed<string[]>(() => {
    return this.graphDataResponse().map((l) => l.month);
  });

  data = computed<number[]>(() => {
    return this.graphDataResponse().map((l) => l.totalEarnings);
  });

  getGraphData() {
    this._reportsService
      .getGraphData(this.reportFilter())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.graphDataResponse.set(res.data);
          console.log(this.ngxGraphData());

          this.chart.data.labels = this.chartLabels();
          this.chart.data.datasets[0].data = this.data();
          this.chart.update();
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  /**
   * create filter signal
   * on any of the filter value update (startdate, enddate) update the signal
   */

  ngOnInit(): void {
    this.getGraphData();
  }

  ngAfterViewInit(): void {
    this.chart = new Chart('earnings-chart', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Earnings',
            data: [],
            backgroundColor: '#4f46e5',
            borderColor: '#4338ca',
            borderWidth: 1,
            borderRadius: 6,
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
