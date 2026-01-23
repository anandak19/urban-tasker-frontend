import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BookingService } from '@features/user/services/bookings/booking.service';
import { PaymentStatus } from '@shared/constants/enums/payment-status.enum';
import { catchError, map, of } from 'rxjs';

export const isTaskNotPaidGuard: CanActivateFn = (route) => {
  const taskId = route.paramMap.get('taskId');
  const bookingService = inject(BookingService);
  const router = inject(Router);

  if (!taskId) {
    return false;
  }

  return bookingService.getTaskPaymentStatus(taskId).pipe(
    map((res) => {
      if (res.data.paymentStatus !== PaymentStatus.PAID) {
        return true;
      }
      router.navigate(['/tasks']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/tasks']);
      return of(false);
    }),
  );
};
