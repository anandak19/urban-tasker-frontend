import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneBookedTaskComponent } from './view-one-booked-task.component';

describe('ViewOneBookedTaskComponent', () => {
  let component: ViewOneBookedTaskComponent;
  let fixture: ComponentFixture<ViewOneBookedTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOneBookedTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOneBookedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
