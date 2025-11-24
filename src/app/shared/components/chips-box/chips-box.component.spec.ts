import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsBoxComponent } from './chips-box.component';

describe('ChipsBoxComponent', () => {
  let component: ChipsBoxComponent;
  let fixture: ComponentFixture<ChipsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipsBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
