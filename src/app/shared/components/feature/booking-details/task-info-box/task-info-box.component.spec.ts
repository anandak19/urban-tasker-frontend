import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInfoBoxComponent } from './task-info-box.component';

describe('TaskInfoBoxComponent', () => {
  let component: TaskInfoBoxComponent;
  let fixture: ComponentFixture<TaskInfoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskInfoBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskInfoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
