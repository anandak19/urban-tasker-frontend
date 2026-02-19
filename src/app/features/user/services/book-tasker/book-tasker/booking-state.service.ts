import { Injectable, signal } from '@angular/core';
import { IOptionData } from '@shared/models/form-inputs.model';

@Injectable({
  providedIn: 'root',
})
export class BookingStateService {
  private currCategory = signal<IOptionData | null>(null);
  private currSubCategory = signal<IOptionData | null>(null);

  selectedCategory = this.currCategory.asReadonly();
  selectedSubCategory = this.currSubCategory.asReadonly();

  setCategory(data: IOptionData) {
    this.currCategory.set(data);
  }

  setSubCategory(data: IOptionData) {
    this.currSubCategory.set(data);
  }

  reset() {
    this.currCategory.set(null);
    this.currSubCategory.set(null);
  }
}
