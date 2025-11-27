import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTaskerApplicationsComponent } from './list-tasker-applications.component';

describe('ListTaskerApplicationsComponent', () => {
  let component: ListTaskerApplicationsComponent;
  let fixture: ComponentFixture<ListTaskerApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTaskerApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTaskerApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
