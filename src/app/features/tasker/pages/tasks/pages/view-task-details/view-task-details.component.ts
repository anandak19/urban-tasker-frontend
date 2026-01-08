import { Component, Input } from '@angular/core';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';

@Component({
  selector: 'app-view-task-details',
  imports: [PageTitleComponent],
  templateUrl: './view-task-details.component.html',
  styleUrl: './view-task-details.component.scss',
})
export class ViewTaskDetailsComponent {}
