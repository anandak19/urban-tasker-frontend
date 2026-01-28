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
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-graph-visualization',
  imports: [],
  templateUrl: './graph-visualization.component.html',
  styleUrl: './graph-visualization.component.scss',
})
export class GraphVisualizationComponent implements OnInit, AfterViewInit {
  private _reportsService = inject(ReportsService);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);

  graphDataResponse = signal<IGraphDataItem[]>([]);
  ngxGraphData = computed<INgxGraphDataItem[]>(() => {
    return this.graphDataResponse().map((item) => ({
      name: item.month,
      value: item.totalEarnings,
    }));
  });

  private chart!: Chart;

  chartLabels = computed<string[]>(() => {
    return this.graphDataResponse().map((l) => l.month);
  });

  data = computed<number[]>(() => {
    return this.graphDataResponse().map((l) => l.totalEarnings);
  });

  getGraphData() {
    this._reportsService
      .getGraphData()
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
    });
  }
}
