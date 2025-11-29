import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneTaskerApplicationComponent } from './view-one-tasker-application.component';

describe('ViewOneTaskerApplicationComponent', () => {
  let component: ViewOneTaskerApplicationComponent;
  let fixture: ComponentFixture<ViewOneTaskerApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOneTaskerApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOneTaskerApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
