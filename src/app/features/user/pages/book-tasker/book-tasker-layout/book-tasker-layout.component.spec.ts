import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTaskerLayoutComponent } from './book-tasker-layout.component';

describe('BookTaskerLayoutComponent', () => {
  let component: BookTaskerLayoutComponent;
  let fixture: ComponentFixture<BookTaskerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookTaskerLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookTaskerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
