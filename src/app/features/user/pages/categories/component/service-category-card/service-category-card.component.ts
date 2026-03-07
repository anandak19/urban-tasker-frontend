import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AuthGuardService } from '@core/services/auth-guard-service/auth-guard.service';
import { UserRoles } from '@shared/constants/enums/user.enum';
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

  private _authGuardService = inject(AuthGuardService);
  userRoles = UserRoles;

  onCategoryClick() {
    if (this._authGuardService.isUserRoleIs(this.userRoles.USER)) {
      const selectedCategory = toOptionData(
        this.categoryCard.id,
        this.categoryCard.name,
      );

      this.parentCategorySelect.emit(selectedCategory);
    }
  }
}
