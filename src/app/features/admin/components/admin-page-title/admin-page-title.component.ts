import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-page-title',
  imports: [],
  templateUrl: './admin-page-title.component.html',
  styleUrl: './admin-page-title.component.scss',
})
export class AdminPageTitleComponent {
  @Input() title!: string;
}
