import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskerAvailbilityComponent } from './tasker-availbility.component';

describe('TaskerAvailbilityComponent', () => {
  let component: TaskerAvailbilityComponent;
  let fixture: ComponentFixture<TaskerAvailbilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskerAvailbilityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskerAvailbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
