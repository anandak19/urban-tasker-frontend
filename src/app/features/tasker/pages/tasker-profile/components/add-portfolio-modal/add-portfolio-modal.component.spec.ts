import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPortfolioModalComponent } from './add-portfolio-modal.component';

describe('AddPortfolioModalComponent', () => {
  let component: AddPortfolioModalComponent;
  let fixture: ComponentFixture<AddPortfolioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPortfolioModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPortfolioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
