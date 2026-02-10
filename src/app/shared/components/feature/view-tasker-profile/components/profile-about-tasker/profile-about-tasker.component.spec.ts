import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAboutTaskerComponent } from './profile-about-tasker.component';

describe('ProfileAboutTaskerComponent', () => {
  let component: ProfileAboutTaskerComponent;
  let fixture: ComponentFixture<ProfileAboutTaskerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAboutTaskerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileAboutTaskerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
