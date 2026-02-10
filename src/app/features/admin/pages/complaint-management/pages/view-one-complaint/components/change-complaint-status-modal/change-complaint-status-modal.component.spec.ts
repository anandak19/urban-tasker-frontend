import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeComplaintStatusModalComponent } from './change-complaint-status-modal.component';

describe('ChangeComplaintStatusModalComponent', () => {
  let component: ChangeComplaintStatusModalComponent;
  let fixture: ComponentFixture<ChangeComplaintStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeComplaintStatusModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeComplaintStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
