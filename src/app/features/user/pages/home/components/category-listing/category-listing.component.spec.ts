import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListingComponent } from './category-listing.component';

describe('CategoryListingComponent', () => {
  let component: CategoryListingComponent;
  let fixture: ComponentFixture<CategoryListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
