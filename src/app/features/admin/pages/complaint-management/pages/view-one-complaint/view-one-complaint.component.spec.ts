import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneComplaintComponent } from './view-one-complaint.component';

describe('ViewOneComplaintComponent', () => {
  let component: ViewOneComplaintComponent;
  let fixture: ComponentFixture<ViewOneComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOneComplaintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOneComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
