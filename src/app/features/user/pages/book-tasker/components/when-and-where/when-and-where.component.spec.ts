import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhenAndWhereComponent } from './when-and-where.component';

describe('WhenAndWhereComponent', () => {
  let component: WhenAndWhereComponent;
  let fixture: ComponentFixture<WhenAndWhereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhenAndWhereComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WhenAndWhereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
