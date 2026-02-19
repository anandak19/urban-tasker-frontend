import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationModalComponent } from './presentation-modal.component';

describe('PresentationModalComponent', () => {
  let component: PresentationModalComponent;
  let fixture: ComponentFixture<PresentationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
