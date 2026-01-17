import { Routes } from '@angular/router';
import { ListComplaintsComponent } from './pages/list-complaints/list-complaints.component';
import { ViewOneComplaintComponent } from './pages/view-one-complaint/view-one-complaint.component';

export const ComplaintManagementRoutes: Routes = [
  {
    path: '',
    component: ListComplaintsComponent,
  },
  {
    path: ':complaintId',
    component: ViewOneComplaintComponent,
  },
];
