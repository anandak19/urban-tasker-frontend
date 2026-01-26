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
import {
  IGraphDataItem,
  INgxGraphDataItem,
} from '@features/admin/models/reports.mode';
import { ReportsService } from '@features/admin/services/reports/reports.service';
import { IApiResponseError } from '@shared/models/api-response.model';

@Component({
  selector: 'app-graph-visualization',
  imports: [],
  templateUrl: './graph-visualization.component.html',
  styleUrl: './graph-visualization.component.scss',
})
export class GraphVisualizationComponent implements OnInit {
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

  getGraphData() {
    this._reportsService
      .getGraphData()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.graphDataResponse.set(res.data);
          console.log(this.ngxGraphData());
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  ngOnInit(): void {
    this.getGraphData();
  }
}
