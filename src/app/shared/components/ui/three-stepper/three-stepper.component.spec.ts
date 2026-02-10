import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeStepperComponent } from './three-stepper.component';

describe('ThreeStepperComponent', () => {
  let component: ThreeStepperComponent;
  let fixture: ComponentFixture<ThreeStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeStepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThreeStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
