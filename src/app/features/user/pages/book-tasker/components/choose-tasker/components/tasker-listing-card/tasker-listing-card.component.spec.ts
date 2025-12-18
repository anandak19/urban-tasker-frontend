import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskerListingCardComponent } from './tasker-listing-card.component';

describe('TaskerListingCardComponent', () => {
  let component: TaskerListingCardComponent;
  let fixture: ComponentFixture<TaskerListingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskerListingCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskerListingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
