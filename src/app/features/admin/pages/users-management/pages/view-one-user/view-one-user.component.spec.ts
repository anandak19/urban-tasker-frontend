import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneUserComponent } from './view-one-user.component';

describe('ViewOneUserComponent', () => {
  let component: ViewOneUserComponent;
  let fixture: ComponentFixture<ViewOneUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOneUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOneUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
