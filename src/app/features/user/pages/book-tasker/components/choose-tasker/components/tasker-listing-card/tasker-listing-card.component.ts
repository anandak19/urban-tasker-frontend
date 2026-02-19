import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IListTasker } from '@features/user/models/tasker/tasker.model';
import { ButtonComponent } from '@shared/components/button/button.component';
import { TaskerProfileModalComponent } from '../../../tasker-profile-modal/tasker-profile-modal.component';

@Component({
  selector: 'app-tasker-listing-card',
  imports: [ButtonComponent, CommonModule],
  templateUrl: './tasker-listing-card.component.html',
  styleUrl: './tasker-listing-card.component.scss',
})
export class TaskerListingCardComponent {
  @Input() taskerData!: IListTasker;
  @Output() chooseTasker = new EventEmitter<{
    taskerId: string;
  }>();

  private _matDialog = inject(MatDialog);

  // on choosing tasker
  onChoosingTasker(taskerId: string) {
    this.chooseTasker.emit({ taskerId });
  }

  viewProfile(taskerId: string) {
    this._matDialog.open(TaskerProfileModalComponent, {
      data: taskerId,
      width: '90vw',
      minWidth: '90vw',
    });
  }
}
