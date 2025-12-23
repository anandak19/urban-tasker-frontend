import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTaskComponent } from './about-task.component';

describe('AboutTaskComponent', () => {
  let component: AboutTaskComponent;
  let fixture: ComponentFixture<AboutTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutTaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
