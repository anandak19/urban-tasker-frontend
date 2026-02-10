import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskerApplicationComponent } from './tasker-application.component';

describe('TaskerApplicationComponent', () => {
  let component: TaskerApplicationComponent;
  let fixture: ComponentFixture<TaskerApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskerApplicationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskerApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
