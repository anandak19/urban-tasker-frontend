import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedUserBoxComponent } from './related-user-box.component';

describe('RelatedUserBoxComponent', () => {
  let component: RelatedUserBoxComponent;
  let fixture: ComponentFixture<RelatedUserBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatedUserBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RelatedUserBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
