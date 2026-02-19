import {
  AfterViewInit,
  Component,
  computed,
  effect,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReportGroupBy } from '@shared/constants/enums/filter-enum';
import { IReportGroupByFilter } from '@shared/models/report/query-filter.model';
import { IBookingsCountReportData } from '@shared/models/report/report.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bookings-count-chart',
  imports: [FormsModule],
  templateUrl: './bookings-count-chart.component.html',
  styleUrl: './bookings-count-chart.component.scss',
})
export class BookingsCountChartComponent implements OnInit, AfterViewInit {
  @Input() chartData = signal<IBookingsCountReportData[]>([]);
  @Output() getChartData = new EventEmitter<IReportGroupByFilter>();

  private chart!: Chart;
  ReportGroupBy = ReportGroupBy;
  groupByFilter = signal<IReportGroupByFilter>({
    reportGroupBy: ReportGroupBy.DAY,
  });

  // chart labels
  chartLabels = computed(() => {
    return this.chartData().map((item) => item.label);
  });
  // chart values
  chartValues = computed(() => {
    return this.chartData().map((item) => item.totalBookings);
  });

  constructor() {
    effect(() => {
      const labels = this.chartLabels();
      const values = this.chartValues();

      if (this.chart) {
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = values;
        this.chart.update();
      }
    });
  }

  onFilterChange(value: ReportGroupBy) {
    this.groupByFilter.set({
      reportGroupBy: value,
    });
    this.fetchChartData();
  }

  initChart() {
    this.chart = new Chart('bookings-count-chart', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Total Bookings',
            data: [],
            backgroundColor: '#d3a900',
            borderColor: '#9c7201',
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

  fetchChartData() {
    this.getChartData.emit(this.groupByFilter());
  }

  ngOnInit(): void {
    this.fetchChartData();
  }

  ngAfterViewInit(): void {
    this.initChart();
  }
}
