import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWorkCategoriesModalComponent } from './update-work-categories-modal.component';

describe('UpdateWorkCategoriesModalComponent', () => {
  let component: UpdateWorkCategoriesModalComponent;
  let fixture: ComponentFixture<UpdateWorkCategoriesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateWorkCategoriesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateWorkCategoriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
