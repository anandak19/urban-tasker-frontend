import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAboutMeModalComponent } from './update-about-me-modal.component';

describe('UpdateAboutMeModalComponent', () => {
  let component: UpdateAboutMeModalComponent;
  let fixture: ComponentFixture<UpdateAboutMeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAboutMeModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateAboutMeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
