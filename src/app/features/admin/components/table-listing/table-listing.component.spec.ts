import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListingComponent } from './table-listing.component';

describe('TableListingComponent', () => {
  let component: TableListingComponent;
  let fixture: ComponentFixture<TableListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
