import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleVideoCallComponent } from './sample-video-call.component';

describe('SampleVideoCallComponent', () => {
  let component: SampleVideoCallComponent;
  let fixture: ComponentFixture<SampleVideoCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleVideoCallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleVideoCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
