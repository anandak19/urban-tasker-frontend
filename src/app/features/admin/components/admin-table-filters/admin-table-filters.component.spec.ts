import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTableFiltersComponent } from './admin-table-filters.component';

describe('AdminTableFiltersComponent', () => {
  let component: AdminTableFiltersComponent;
  let fixture: ComponentFixture<AdminTableFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTableFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTableFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
