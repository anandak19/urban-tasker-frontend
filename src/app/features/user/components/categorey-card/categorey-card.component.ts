import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IListCategoryCard } from '@features/user/models/home/home.model';
import { ButtonComponent } from '@shared/components/button/button.component';

export interface ICategory {
  categoryName: string;
  description: string;
  imageUrl: string;
  categoryId: string;
}

@Component({
  selector: 'app-categorey-card',
  imports: [ButtonComponent, CommonModule],
  templateUrl: './categorey-card.component.html',
  styleUrl: './categorey-card.component.scss',
})
export class CategoreyCardComponent {
  @Input() categoryData!: IListCategoryCard;

  onBookBtnClick(categoreyId: string) {
    alert(`Clicked category ${categoreyId}`);
  }
}
