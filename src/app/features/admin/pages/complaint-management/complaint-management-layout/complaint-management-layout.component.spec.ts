import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintManagementLayoutComponent } from './complaint-management-layout.component';

describe('ComplaintManagementLayoutComponent', () => {
  let component: ComplaintManagementLayoutComponent;
  let fixture: ComponentFixture<ComplaintManagementLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintManagementLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComplaintManagementLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
