import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyChooseCardComponent } from './why-choose-card.component';

describe('WhyChooseCardComponent', () => {
  let component: WhyChooseCardComponent;
  let fixture: ComponentFixture<WhyChooseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyChooseCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WhyChooseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
