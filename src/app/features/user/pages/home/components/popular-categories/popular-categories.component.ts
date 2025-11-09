import { Component } from '@angular/core';
import { SectionTitleComponent } from '@features/user/components/section-title/section-title.component';
import { CategoryListingComponent } from '../category-listing/category-listing.component';

@Component({
  selector: 'app-popular-categories',
  imports: [SectionTitleComponent, CategoryListingComponent],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss',
})
export class PopularCategoriesComponent {}
