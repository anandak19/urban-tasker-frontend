import { Component, Input } from '@angular/core';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';

@Component({
  selector: 'app-view-category',
  imports: [AdminPageTitleComponent, BackButtonComponent],
  templateUrl: './view-category.component.html',
  styleUrl: './view-category.component.scss',
})
export class ViewCategoryComponent {
  @Input() categoryName = 'Sample Category';
}
