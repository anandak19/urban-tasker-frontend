import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComplaintComponent } from './tasks-complaint.component';

describe('TasksComplaintComponent', () => {
  let component: TasksComplaintComponent;
  let fixture: ComponentFixture<TasksComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksComplaintComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
