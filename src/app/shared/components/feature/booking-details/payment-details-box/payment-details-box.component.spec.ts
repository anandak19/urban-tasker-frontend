import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetailsBoxComponent } from './payment-details-box.component';

describe('PaymentDetailsBoxComponent', () => {
  let component: PaymentDetailsBoxComponent;
  let fixture: ComponentFixture<PaymentDetailsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentDetailsBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentDetailsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
