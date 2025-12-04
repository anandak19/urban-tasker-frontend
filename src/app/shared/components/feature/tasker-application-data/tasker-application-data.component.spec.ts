import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskerApplicationDataComponent } from './tasker-application-data.component';

describe('TaskerApplicationDataComponent', () => {
  let component: TaskerApplicationDataComponent;
  let fixture: ComponentFixture<TaskerApplicationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskerApplicationDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskerApplicationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
