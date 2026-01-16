import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComplaintComponent } from './loading-complaint.component';

describe('LoadingComplaintComponent', () => {
  let component: LoadingComplaintComponent;
  let fixture: ComponentFixture<LoadingComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingComplaintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
