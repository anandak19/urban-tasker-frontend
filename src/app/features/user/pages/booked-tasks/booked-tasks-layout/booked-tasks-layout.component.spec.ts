import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedTasksLayoutComponent } from './booked-tasks-layout.component';

describe('BookedTasksLayoutComponent', () => {
  let component: BookedTasksLayoutComponent;
  let fixture: ComponentFixture<BookedTasksLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookedTasksLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookedTasksLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
