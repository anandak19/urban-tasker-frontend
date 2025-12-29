import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLocationFormComponent } from './user-location-form.component';

describe('UserLocationFormComponent', () => {
  let component: UserLocationFormComponent;
  let fixture: ComponentFixture<UserLocationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLocationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
