import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBasedBookingDoughnutGraphComponent } from './status-based-booking-doughnut-graph.component';

describe('StatusBasedBookingDoughnutGraphComponent', () => {
  let component: StatusBasedBookingDoughnutGraphComponent;
  let fixture: ComponentFixture<StatusBasedBookingDoughnutGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBasedBookingDoughnutGraphComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusBasedBookingDoughnutGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
