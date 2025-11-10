import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { AdminTableFiltersComponent } from '@features/admin/components/admin-table-filters/admin-table-filters.component';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-list-category',
  imports: [
    AdminPageTitleComponent,
    ButtonComponent,
    AdminTableFiltersComponent,
  ],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss',
})
export class ListCategoryComponent {
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  addCategoryClicked() {
    this._router.navigate(['add'], { relativeTo: this._route });
  }

  searchCategory(search: string) {
    console.log(search);
  }
}
