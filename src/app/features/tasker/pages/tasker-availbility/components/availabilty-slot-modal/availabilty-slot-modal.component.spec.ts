import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabiltySlotModalComponent } from './availabilty-slot-modal.component';

describe('AvailabiltySlotModalComponent', () => {
  let component: AvailabiltySlotModalComponent;
  let fixture: ComponentFixture<AvailabiltySlotModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailabiltySlotModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailabiltySlotModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
