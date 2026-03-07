import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from '@core/services/auth-guard-service/auth-guard.service';
import { IListCategoryCard } from '@features/user/models/home/home.model';
import { BookingStateService } from '@features/user/services/book-tasker/book-tasker/booking-state.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { UserRoles } from '@shared/constants/enums/user.enum';
import { toOptionData } from '@shared/helpers/options-builder';

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

  private _router = inject(Router);
  private _bookingStateService = inject(BookingStateService);
  private _authGuardService = inject(AuthGuardService);

  currUser = this._authGuardService.currentUser();
  userRoles = UserRoles;

  onBookBtnClick() {
    if (!this.categoryData || !this.isUser()) return;

    const selectedCategory = toOptionData(
      this.categoryData.parentCategoryId,
      this.categoryData.parentCategoryName,
    );

    const selectedSubcategory = toOptionData(
      this.categoryData.id,
      this.categoryData.name,
    );

    this._bookingStateService.setCategory(selectedCategory);
    this._bookingStateService.setSubCategory(selectedSubcategory);

    this._router.navigate(['/book-tasker']);
  }

  isUser() {
    return this._authGuardService.isUserRoleIs(this.userRoles.USER);
  }
}
