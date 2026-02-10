import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyChatBoxComponent } from './empty-chat-box.component';

describe('EmptyChatBoxComponent', () => {
  let component: EmptyChatBoxComponent;
  let fixture: ComponentFixture<EmptyChatBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyChatBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyChatBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
