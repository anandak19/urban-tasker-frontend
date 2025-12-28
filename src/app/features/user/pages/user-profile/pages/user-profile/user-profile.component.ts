import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '@features/user/services/user/user.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';

@Component({
  selector: 'app-user-profile',
  imports: [PageTitleComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  private _userService = inject(UserService);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this._userService
      .getUserData()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log('On get user', res);
        },
        error: (err: IApiResponseError) => {
          console.log(err);
        },
      });
  }
}
