import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICreateCategory } from '@features/admin/models/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryManagementService {
  private apiEndPoint = 'admin/category';
  private _http = inject(HttpClient);

  addCategory(categoryData: FormData) {
    return this._http.post(`${this.apiEndPoint}`, categoryData);
  }

  updateCatgory(categoryData: ICreateCategory) {
    console.log('Category to update', categoryData);
  }

  getAllCategories() {
    console.log('GET ALL CATEGORY NOT IMPLEMENTED');
  }

  changeCategoryActiveState(id: string) {
    console.log('Category id to update state: ', id);
  }

  deleteCategoryById(id: string) {
    console.log('Category id to delete: ', id);
  }
}
