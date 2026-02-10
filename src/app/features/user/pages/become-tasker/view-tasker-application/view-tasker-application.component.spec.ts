import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskerApplicationComponent } from './view-tasker-application.component';

describe('ViewTaskerApplicationComponent', () => {
  let component: ViewTaskerApplicationComponent;
  let fixture: ComponentFixture<ViewTaskerApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTaskerApplicationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewTaskerApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
