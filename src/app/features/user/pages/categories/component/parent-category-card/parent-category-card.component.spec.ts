import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentCategoryCardComponent } from './parent-category-card.component';

describe('ParentCategoryCardComponent', () => {
  let component: ParentCategoryCardComponent;
  let fixture: ComponentFixture<ParentCategoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentCategoryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentCategoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
