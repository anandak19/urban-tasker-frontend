import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStatusCountChartComponent } from './task-status-count-chart.component';

describe('TaskStatusCountChartComponent', () => {
  let component: TaskStatusCountChartComponent;
  let fixture: ComponentFixture<TaskStatusCountChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskStatusCountChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskStatusCountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
