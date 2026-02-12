import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStatusBoxComponent } from './task-status-box.component';

describe('TaskStatusBoxComponent', () => {
  let component: TaskStatusBoxComponent;
  let fixture: ComponentFixture<TaskStatusBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskStatusBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskStatusBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
