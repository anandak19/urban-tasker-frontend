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
import { MatChipListbox, MatChip } from '@angular/material/chips';
import { ITaskerAbout } from '@shared/models/tasker-data.model';
import { Dialog } from '@angular/cdk/dialog';
import { UpdateAboutMeModalComponent } from './components/update-about-me-modal/update-about-me-modal.component';
import { AuthGuardService } from '@core/services/auth-guard-service/auth-guard.service';
import { UserRoles } from '@shared/constants/enums/user.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IOptionData } from '@shared/models/form-inputs.model';
import { AddWorkCategoryComponent } from './components/add-work-category/add-work-category.component';

@Component({
  selector: 'app-profile-about-tasker',
  imports: [ButtonComponent, MatChipListbox, MatChip],
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
  private _destroyRef = inject(DestroyRef);

  currentUser = this._authGuardService.currentUser;

  //open edit modal and update the about data on close
  onEditAboutClick() {
    if (this.currentUser()?.userRole === UserRoles.TASKER) {
      const dialogRef = this._dialog.open(UpdateAboutMeModalComponent, {
        data: this.taskerAbout,
      });

      dialogRef.closed.pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
        next: (res) => {
          console.log('Voala', res);
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

  ngOnInit(): void {
    console.log('About');
    this.getAboutData.emit();
    console.log(this.taskerWorkCategories());
  }
}
