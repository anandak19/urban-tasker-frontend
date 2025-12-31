import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTaskerReviewsComponent } from './profile-tasker-reviews.component';

describe('ProfileTaskerReviewsComponent', () => {
  let component: ProfileTaskerReviewsComponent;
  let fixture: ComponentFixture<ProfileTaskerReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileTaskerReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileTaskerReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
