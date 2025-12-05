import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskerHeaderComponent } from './tasker-header.component';

describe('TaskerHeaderComponent', () => {
  let component: TaskerHeaderComponent;
  let fixture: ComponentFixture<TaskerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskerHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
