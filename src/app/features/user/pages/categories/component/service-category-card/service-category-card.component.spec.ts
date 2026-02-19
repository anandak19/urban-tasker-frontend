import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCategoryCardComponent } from './service-category-card.component';

describe('ServiceCategoryCardComponent', () => {
  let component: ServiceCategoryCardComponent;
  let fixture: ComponentFixture<ServiceCategoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCategoryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCategoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
