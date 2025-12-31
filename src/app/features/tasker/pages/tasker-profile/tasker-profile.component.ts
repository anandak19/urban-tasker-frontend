import {
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { ViewTaskerProfileComponent } from '@shared/components/feature/view-tasker-profile/view-tasker-profile.component';
import { TaskerProfileService } from '@features/tasker/services/tasker-profile/tasker-profile.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IApiResponseError } from '@shared/models/api-response.model';
import {
  ITaskerAbout,
  ITaskerCardData,
} from '@shared/models/tasker-data.model';

@Component({
  selector: 'app-tasker-profile',
  imports: [PageTitleComponent, ViewTaskerProfileComponent],
  templateUrl: './tasker-profile.component.html',
  styleUrl: './tasker-profile.component.scss',
})
export class TaskerProfileComponent implements OnInit {
  private _taskerService = inject(TaskerProfileService);
  private _destroyRef = inject(DestroyRef);

  taskerCardData = signal<ITaskerCardData | null>(null);
  @Input() taskerAbout = signal<ITaskerAbout | null>(null);

  getCardData() {
    this._taskerService
      .getTaskerCardData()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.taskerCardData.set(res.data);
        },
        error: (err: IApiResponseError) => {
          console.log(err);
        },
      });
  }

  getAboutData() {
    this._taskerService
      .getTaskerAbout()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.taskerAbout.set(res.data);
        },
        error: (err: IApiResponseError) => {
          console.log(err);
        },
      });
  }

  ngOnInit(): void {
    this.getCardData();
  }
}
