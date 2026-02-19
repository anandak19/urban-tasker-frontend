import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryCardComponent } from './sub-category-card.component';

describe('SubCategoryCardComponent', () => {
  let component: SubCategoryCardComponent;
  let fixture: ComponentFixture<SubCategoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubCategoryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCategoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
