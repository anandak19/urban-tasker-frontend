import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManagementLayoutComponent } from './users-management-layout.component';

describe('UsersManagementLayoutComponent', () => {
  let component: UsersManagementLayoutComponent;
  let fixture: ComponentFixture<UsersManagementLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersManagementLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersManagementLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
