import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskerProfileComponent } from './tasker-profile.component';

describe('TaskerProfileComponent', () => {
  let component: TaskerProfileComponent;
  let fixture: ComponentFixture<TaskerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskerProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
