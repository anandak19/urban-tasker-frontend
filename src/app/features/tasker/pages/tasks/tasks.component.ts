import { Component } from '@angular/core';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';

@Component({
  selector: 'app-tasks',
  imports: [PageTitleComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {}
