import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageTitleComponent } from './admin-page-title.component';

describe('AdminPageTitleComponent', () => {
  let component: AdminPageTitleComponent;
  let fixture: ComponentFixture<AdminPageTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPageTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
