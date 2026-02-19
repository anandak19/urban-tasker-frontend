import { Component, EventEmitter, Input, Output } from '@angular/core';
import { toOptionData } from '@shared/helpers/options-builder';
import { ISubCategoryCard } from '@shared/models/categories/subcategories.model';
import { IOptionData } from '@shared/models/form-inputs.model';

@Component({
  selector: 'app-service-category-card',
  imports: [],
  templateUrl: './service-category-card.component.html',
  styleUrl: './service-category-card.component.scss',
})
export class ServiceCategoryCardComponent {
  @Input() categoryCard!: ISubCategoryCard;
  @Output() parentCategorySelect = new EventEmitter<IOptionData>();

  onCategoryClick() {
    const selectedCategory = toOptionData(
      this.categoryCard.id,
      this.categoryCard.name,
    );

    this.parentCategorySelect.emit(selectedCategory);
  }
}
