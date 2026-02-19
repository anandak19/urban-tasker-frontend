import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryListModalComponent } from './sub-category-list-modal.component';

describe('SubCategoryListModalComponent', () => {
  let component: SubCategoryListModalComponent;
  let fixture: ComponentFixture<SubCategoryListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubCategoryListModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubCategoryListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
