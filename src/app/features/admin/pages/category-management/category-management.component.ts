import { Component } from '@angular/core';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { AdminTableFiltersComponent } from '@features/admin/components/admin-table-filters/admin-table-filters.component';

@Component({
  selector: 'app-category-management',
  imports: [
    AdminPageTitleComponent,
    ButtonComponent,
    AdminTableFiltersComponent,
  ],
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.scss',
})
export class CategoryManagementComponent {
  addCategoryClicked() {
    alert('Add category');
  }

  searchCategory(search: string) {
    console.log(search);
  }
}
