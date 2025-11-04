import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoreyCardComponent } from './categorey-card.component';

describe('CategoreyCardComponent', () => {
  let component: CategoreyCardComponent;
  let fixture: ComponentFixture<CategoreyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoreyCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoreyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
