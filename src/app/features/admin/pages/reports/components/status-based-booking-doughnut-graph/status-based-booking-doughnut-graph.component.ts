import { AfterViewInit, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { ReportsService } from '@features/admin/services/reports/reports.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-status-based-booking-doughnut-graph',
  imports: [],
  templateUrl: './status-based-booking-doughnut-graph.component.html',
  styleUrl: './status-based-booking-doughnut-graph.component.scss',
})
export class StatusBasedBookingDoughnutGraphComponent implements AfterViewInit {
  private bookingStatusChart!: Chart;

  private _reportsService = inject(ReportsService);
  private _snackbarService = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);

  getStatusGraphData() {
    this._reportsService
      .getStatusGraphData()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          const data = res.data;
          this.bookingStatusChart.data.datasets[0].data = [
            data.cancelled,
            data.completed,
            data.inProgress,
            data.overdue,
            data.pending,
            data.rejected,
          ];

          this.bookingStatusChart.update();
        },
        error: (err: IApiResponseError) => {
          this._snackbarService.error(err.message);
        },
      });
  }

  ngAfterViewInit(): void {
    this.bookingStatusChart = new Chart('booking-status-chart', {
      type: 'doughnut',
      data: {
        labels: [
          'Cancelled',
          'Completed',
          'In Progress',
          'Overdue',
          'Pending',
          'Rejected',
        ],
        datasets: [
          {
            label: 'Total Tasks',
            data: [],
            backgroundColor: [
              '#ff6384',
              '#41b100',
              '#0085d7',
              '#8d8d8d',
              '#edc500',
              '#a40000',
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
    this.getStatusGraphData();
  }
}
