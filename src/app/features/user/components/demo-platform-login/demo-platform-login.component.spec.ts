import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoPlatformLoginComponent } from './demo-platform-login.component';

describe('DemoPlatformLoginComponent', () => {
  let component: DemoPlatformLoginComponent;
  let fixture: ComponentFixture<DemoPlatformLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoPlatformLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoPlatformLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
