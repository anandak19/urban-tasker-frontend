import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentManagementLayoutComponent } from './payment-management-layout.component';

describe('PaymentManagementLayoutComponent', () => {
  let component: PaymentManagementLayoutComponent;
  let fixture: ComponentFixture<PaymentManagementLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentManagementLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentManagementLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
