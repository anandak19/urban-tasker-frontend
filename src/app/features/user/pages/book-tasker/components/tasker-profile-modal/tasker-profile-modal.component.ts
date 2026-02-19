import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PresentationModalComponent } from '@shared/components/ui/presentation-modal/presentation-modal.component';
import { UserViewTaskerProfileComponent } from '@features/user/pages/user-view-tasker-profile/user-view-tasker-profile.component';

@Component({
  selector: 'app-tasker-profile-modal',
  imports: [PresentationModalComponent, UserViewTaskerProfileComponent],
  templateUrl: './tasker-profile-modal.component.html',
  styleUrl: './tasker-profile-modal.component.scss',
})
export class TaskerProfileModalComponent {
  private _dialogRef = inject(MatDialogRef);
  taskerId = inject<string>(MAT_DIALOG_DATA);
  close() {
    this._dialogRef.close();
  }
}
