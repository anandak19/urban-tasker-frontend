import { Component } from '@angular/core';
import {
  CategoreyCardComponent,
  ICategory,
} from '@features/user/components/categorey-card/categorey-card.component';

@Component({
  selector: 'app-category-listing',
  imports: [CategoreyCardComponent],
  templateUrl: './category-listing.component.html',
  styleUrl: './category-listing.component.scss',
})
export class CategoryListingComponent {
  category: ICategory = {
    categoryId: 'sfsdfgsdfsd',
    categoryName: 'Cleaning Service',
    description:
      'Clean your home in a way that you dont need to clean it aggin in your life',
    imageUrl: '/assets/images/category.jpg',
  };
}
