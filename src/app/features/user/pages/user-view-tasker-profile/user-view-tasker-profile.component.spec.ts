import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewTaskerProfileComponent } from './user-view-tasker-profile.component';

describe('UserViewTaskerProfileComponent', () => {
  let component: UserViewTaskerProfileComponent;
  let fixture: ComponentFixture<UserViewTaskerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserViewTaskerProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserViewTaskerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
