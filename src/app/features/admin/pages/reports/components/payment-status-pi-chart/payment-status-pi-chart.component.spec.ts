import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusPiChartComponent } from './payment-status-pi-chart.component';

describe('PaymentStatusPiChartComponent', () => {
  let component: PaymentStatusPiChartComponent;
  let fixture: ComponentFixture<PaymentStatusPiChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentStatusPiChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentStatusPiChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
