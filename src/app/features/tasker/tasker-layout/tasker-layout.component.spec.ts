import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskerLayoutComponent } from './tasker-layout.component';

describe('TaskerLayoutComponent', () => {
  let component: TaskerLayoutComponent;
  let fixture: ComponentFixture<TaskerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskerLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
