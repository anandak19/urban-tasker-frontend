import { Routes } from '@angular/router';
import { ChatLayoutComponent } from './chat-layout/chat-layout.component';

export const ChatRoutes: Routes = [
  {
    path: '',
    component: ChatLayoutComponent,
  },
  {
    path: ':roomId',
    component: ChatLayoutComponent,
  },
];
