import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTimingsBoxComponent } from './task-timings-box.component';

describe('TaskTimingsBoxComponent', () => {
  let component: TaskTimingsBoxComponent;
  let fixture: ComponentFixture<TaskTimingsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTimingsBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskTimingsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
