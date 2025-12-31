import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskerProfileComponent } from './view-tasker-profile.component';

describe('ViewTaskerProfileComponent', () => {
  let component: ViewTaskerProfileComponent;
  let fixture: ComponentFixture<ViewTaskerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTaskerProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewTaskerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
