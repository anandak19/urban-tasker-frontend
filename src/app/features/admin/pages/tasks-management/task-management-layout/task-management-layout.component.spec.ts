import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagementLayoutComponent } from './task-management-layout.component';

describe('TaskManagementLayoutComponent', () => {
  let component: TaskManagementLayoutComponent;
  let fixture: ComponentFixture<TaskManagementLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskManagementLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskManagementLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
