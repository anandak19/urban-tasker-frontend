import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ITaskerAbout } from '@shared/models/tasker-data.model';
import { Dialog } from '@angular/cdk/dialog';
import { UpdateAboutMeModalComponent } from './components/update-about-me-modal/update-about-me-modal.component';
import { AuthGuardService } from '@core/services/auth-guard-service/auth-guard.service';
import { UserRoles } from '@shared/constants/enums/user.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IOptionData } from '@shared/models/form-inputs.model';
import { AddWorkCategoryComponent } from './components/add-work-category/add-work-category.component';
import { TaskerProfileService } from '@features/tasker/services/tasker-profile/tasker-profile.service';
import { IApiResponseError } from '@shared/models/api-response.model';
import { ConfirmDialogService } from '@core/services/dialog/confirm-dialog.service';
import { ChipsBoxComponent } from '@shared/components/chips-box/chips-box.component';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile-about-tasker',
  imports: [ButtonComponent, ChipsBoxComponent, MatIconModule],
  templateUrl: './profile-about-tasker.component.html',
  styleUrl: './profile-about-tasker.component.scss',
})
export class ProfileAboutTaskerComponent implements OnInit {
  @Input() isEditable = false;
  @Input() taskerAbout = signal<ITaskerAbout | null>(null);
  @Input() taskerWorkCategories = signal<IOptionData[]>([]);
  @Output() getAboutData = new EventEmitter();

  private _dialog = inject(Dialog);
  private _authGuardService = inject(AuthGuardService);
  private _taskerProfileService = inject(TaskerProfileService);
  private _destroyRef = inject(DestroyRef);
  private _confirmDialogService = inject(ConfirmDialogService);
  private _snackbarService = inject(SnackbarService);

  currentUser = this._authGuardService.currentUser;

  //open edit modal and update the about data on close
  onEditAboutClick() {
    if (this.currentUser()?.userRole === UserRoles.TASKER) {
      const dialogRef = this._dialog.open(UpdateAboutMeModalComponent, {
        data: this.taskerAbout,
      });

      dialogRef.closed.pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
        next: (res) => {
          if (!res) return;
          this.taskerAbout.update((a) => ({
            ...a,
            about: res as string,
          }));
        },
      });
    }
  }

  //open modal for edit work categories
  onAddWorkCategoryClick() {
    if (this.currentUser()?.userRole === UserRoles.TASKER) {
      const dialogRef = this._dialog.open(AddWorkCategoryComponent);
      dialogRef.closed.pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
        next: (res) => {
          if (res) {
            this.getAboutData.emit();
          }
        },
      });
    }
  }

  // to remove a working cateogory
  async onRemoveWorkCategory(categoryId: string) {
    if (this.currentUser()?.userRole !== UserRoles.TASKER) return;

    const yes = await this._confirmDialogService.ask(
      'Are you sure to remove this category',
    );

    if (yes) {
      // update ui
      this.taskerWorkCategories.update((list) =>
        list.filter((c) => c.id !== categoryId),
      );

      this._taskerProfileService
        .removeTaskerWorkCategory(categoryId)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({
          next: (res) => {
            this._snackbarService.success(res.message);
          },
          error: (err: IApiResponseError) => {
            this._snackbarService.error(err.message);
            this.getAboutData.emit();
          },
        });
    }
  }

  ngOnInit(): void {
    console.log('About');
    this.getAboutData.emit();
    console.log(this.taskerWorkCategories());
  }
}
