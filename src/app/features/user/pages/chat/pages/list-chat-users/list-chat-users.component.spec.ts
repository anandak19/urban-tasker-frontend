import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChatUsersComponent } from './list-chat-users.component';

describe('ListChatUsersComponent', () => {
  let component: ListChatUsersComponent;
  let fixture: ComponentFixture<ListChatUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListChatUsersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListChatUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
