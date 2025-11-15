import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ICategoryData } from '@features/admin/models/category.interface';
import { ButtonComponent } from '@shared/components/button/button.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-details-card',
  imports: [ButtonComponent, MatSlideToggleModule, CommonModule],
  templateUrl: './category-details-card.component.html',
  styleUrl: './category-details-card.component.scss',
})
export class CategoryDetailsCardComponent {
  category = signal<ICategoryData>({} as ICategoryData);

  @Input()
  set categoryData(value: ICategoryData) {
    this.category.set(value);
  }

  @Output() deleteClicked = new EventEmitter();
  @Output() changeActiveStatus = new EventEmitter<boolean>();

  onDeleteClick() {
    this.deleteClicked.emit();
  }

  onChangeStatusClick(status = false) {
    this.changeActiveStatus.emit(status);
  }
}
