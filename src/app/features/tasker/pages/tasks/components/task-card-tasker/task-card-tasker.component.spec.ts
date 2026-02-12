import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardTaskerComponent } from './task-card-tasker.component';

describe('TaskCardTaskerComponent', () => {
  let component: TaskCardTaskerComponent;
  let fixture: ComponentFixture<TaskCardTaskerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardTaskerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCardTaskerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
