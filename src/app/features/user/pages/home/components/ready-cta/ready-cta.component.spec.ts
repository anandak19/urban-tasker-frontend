import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyCtaComponent } from './ready-cta.component';

describe('ReadyCtaComponent', () => {
  let component: ReadyCtaComponent;
  let fixture: ComponentFixture<ReadyCtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadyCtaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadyCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
