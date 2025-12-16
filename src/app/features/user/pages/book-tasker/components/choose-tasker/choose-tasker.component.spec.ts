import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTaskerComponent } from './choose-tasker.component';

describe('ChooseTaskerComponent', () => {
  let component: ChooseTaskerComponent;
  let fixture: ComponentFixture<ChooseTaskerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseTaskerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChooseTaskerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
