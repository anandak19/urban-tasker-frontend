import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTaskerPortfolioComponent } from './profile-tasker-portfolio.component';

describe('ProfileTaskerPortfolioComponent', () => {
  let component: ProfileTaskerPortfolioComponent;
  let fixture: ComponentFixture<ProfileTaskerPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileTaskerPortfolioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileTaskerPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
