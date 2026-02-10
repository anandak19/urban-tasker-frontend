import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskerApplicationsLayoutComponent } from './tasker-applications-layout.component';

describe('TaskerApplicationsLayoutComponent', () => {
  let component: TaskerApplicationsLayoutComponent;
  let fixture: ComponentFixture<TaskerApplicationsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskerApplicationsLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskerApplicationsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
