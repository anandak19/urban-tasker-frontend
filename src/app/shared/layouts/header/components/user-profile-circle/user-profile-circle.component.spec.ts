import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileCircleComponent } from './user-profile-circle.component';

describe('UserProfileCircleComponent', () => {
  let component: UserProfileCircleComponent;
  let fixture: ComponentFixture<UserProfileCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileCircleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
