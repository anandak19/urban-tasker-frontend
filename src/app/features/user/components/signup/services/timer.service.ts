import { inject, Injectable, signal } from '@angular/core';
import { SignupService } from './signup.service';
import { IApiResponseSuccess } from '@shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private _singupService = inject(SignupService);
  timer = signal(0);

  setTimer() {
    this._singupService.getTimeLeft().subscribe({
      next: (res) => {
        const result = res as IApiResponseSuccess<{ timeLeft: number }>;
        this.timer.set(result.data.timeLeft);
        this.startCountdown();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  startCountdown() {
    const tick = () => {
      if (this.timer() > 0) {
        this.timer.set(this.timer() - 1);
        setTimeout(tick, 1000);
      }
    };
    tick();
  }
}
