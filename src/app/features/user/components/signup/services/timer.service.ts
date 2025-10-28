import { inject, Injectable, signal } from '@angular/core';
import { SignupService } from './signup.service';
import { IApiResponseSuccess } from '@shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private _singupService = inject(SignupService);
  private _intervalId!: ReturnType<typeof setInterval>;
  timer = signal(0);

  setTimer() {
    this._singupService.getTimeLeft().subscribe({
      next: (res) => {
        const result = res as IApiResponseSuccess<{ timeLeft: number }>;
        this.timer.set(result.data.timeLeft);

        if (this._intervalId) {
          clearInterval(this._intervalId);
        }

        this._intervalId = setInterval(() => {
          if (this.timer() > 0) {
            this.timer.update((val) => val - 1);
          } else {
            clearInterval(this._intervalId);
          }
        }, 1000);
      },
    });
  }
}
