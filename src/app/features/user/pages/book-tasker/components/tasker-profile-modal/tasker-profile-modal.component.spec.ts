import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskerProfileModalComponent } from './tasker-profile-modal.component';

describe('TaskerProfileModalComponent', () => {
  let component: TaskerProfileModalComponent;
  let fixture: ComponentFixture<TaskerProfileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskerProfileModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskerProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
