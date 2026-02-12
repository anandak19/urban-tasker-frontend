import { AfterViewInit, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { ReportsService } from '@features/admin/services/reports/reports.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-payment-status-pi-chart',
  imports: [],
  templateUrl: './payment-status-pi-chart.component.html',
  styleUrl: './payment-status-pi-chart.component.scss',
})
export class PaymentStatusPiChartComponent implements AfterViewInit {
  private paymentStatusChart!: Chart;

  private _reportsService = inject(ReportsService);
  private _snackbarService = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);

  getPaymentStatusGraphData() {
    this._reportsService
      .getPaymentStatusGraphData()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          const data = res.data;
          this.paymentStatusChart.data.datasets[0].data = [
            data.created,
            data.attempted,
            data.paid,
            data.faild,
            data.pending,
          ];

          this.paymentStatusChart.update();
        },
        error: (err: IApiResponseError) => {
          this._snackbarService.error(err.message);
        },
      });
  }

  ngAfterViewInit(): void {
    this.paymentStatusChart = new Chart('payment-status-chart', {
      type: 'pie',
      data: {
        labels: ['Created', 'Attempted', 'Paid', 'Faild', 'Pending'],
        datasets: [
          {
            label: 'Total in numbers',
            data: [],
            backgroundColor: [
              '#0085d7',
              '#edc500',
              '#41b100',
              '#ff6384',
              '#8d8d8d',
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
    this.getPaymentStatusGraphData();
  }
}
