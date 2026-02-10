import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDetailsCardComponent } from './category-details-card.component';

describe('CategoryDetailsCardComponent', () => {
  let component: CategoryDetailsCardComponent;
  let fixture: ComponentFixture<CategoryDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryDetailsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
