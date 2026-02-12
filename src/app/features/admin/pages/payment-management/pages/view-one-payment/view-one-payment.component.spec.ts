import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOnePaymentComponent } from './view-one-payment.component';

describe('ViewOnePaymentComponent', () => {
  let component: ViewOnePaymentComponent;
  let fixture: ComponentFixture<ViewOnePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOnePaymentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewOnePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
