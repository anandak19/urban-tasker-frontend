import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsCountChartComponent } from './bookings-count-chart.component';

describe('BookingsCountChartComponent', () => {
  let component: BookingsCountChartComponent;
  let fixture: ComponentFixture<BookingsCountChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingsCountChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingsCountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
