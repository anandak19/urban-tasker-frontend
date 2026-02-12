import { Component, Input } from '@angular/core';
import { CategoreyCardComponent } from '@features/user/components/categorey-card/categorey-card.component';
import { IListCategoryCard } from '@features/user/models/home/home.model';

// this is a categories showing compoent only
@Component({
  selector: 'app-category-listing',
  imports: [CategoreyCardComponent],
  templateUrl: './category-listing.component.html',
  styleUrl: './category-listing.component.scss',
})
export class CategoryListingComponent {
  @Input() categories: IListCategoryCard[] = [];
}
