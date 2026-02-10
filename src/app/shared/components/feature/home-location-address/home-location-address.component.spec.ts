import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLocationAddressComponent } from './home-location-address.component';

describe('HomeLocationAddressComponent', () => {
  let component: HomeLocationAddressComponent;
  let fixture: ComponentFixture<HomeLocationAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeLocationAddressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeLocationAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
