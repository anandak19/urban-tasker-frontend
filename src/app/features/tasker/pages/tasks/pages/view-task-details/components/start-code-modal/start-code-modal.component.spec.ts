import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCodeModalComponent } from './start-code-modal.component';

describe('StartCodeModalComponent', () => {
  let component: StartCodeModalComponent;
  let fixture: ComponentFixture<StartCodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartCodeModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StartCodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
