import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSummaryComponent } from './application-summary.component';

describe('ApplicationSummaryComponent', () => {
  let component: ApplicationSummaryComponent;
  let fixture: ComponentFixture<ApplicationSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
