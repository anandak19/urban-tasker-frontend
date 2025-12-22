import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookedTasksComponent } from './list-booked-tasks.component';

describe('ListBookedTasksComponent', () => {
  let component: ListBookedTasksComponent;
  let fixture: ComponentFixture<ListBookedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBookedTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBookedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
