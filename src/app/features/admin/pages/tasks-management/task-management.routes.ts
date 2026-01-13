import { Routes } from '@angular/router';
import { ListBookingsComponent } from './pages/list-bookings/list-bookings.component';
import { BookingDetailsComponent } from './pages/booking-details/booking-details.component';

export const taskManagementRoutes: Routes = [
  {
    path: '',
    component: ListBookingsComponent,
  },
  {
    path: ':bookingId',
    component: BookingDetailsComponent,
  },
];
