import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletTransactionsListingComponent } from './wallet-transactions-listing.component';

describe('WalletTransactionsListingComponent', () => {
  let component: WalletTransactionsListingComponent;
  let fixture: ComponentFixture<WalletTransactionsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletTransactionsListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletTransactionsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
