import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IListTasker } from '@features/user/models/tasker/tasker.model';
import { ButtonComponent } from '@shared/components/button/button.component';

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

  private _router = inject(Router);

  // on choosing tasker
  onChoosingTasker(taskerId: string) {
    this.chooseTasker.emit({ taskerId });
  }

  viewProfile(taskerId: string) {
    this._router.navigate([`tasker/${taskerId}/profile`]);
  }
}
