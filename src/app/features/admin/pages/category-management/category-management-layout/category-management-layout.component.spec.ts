import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryManagementLayout } from './category-management-layout.component';

describe('CategoryManagementLayout', () => {
  let component: CategoryManagementLayout;
  let fixture: ComponentFixture<CategoryManagementLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryManagementLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryManagementLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
