import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IFindAllCategoriesResponse } from '@features/admin/models/api-response.model';
import { ICreateCategory } from '@features/admin/models/category.interface';
// import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryManagementService {
  private apiEndPoint = 'admin/category';
  private _http = inject(HttpClient);

  addCategory(categoryData: FormData) {
    console.log('Category to add', categoryData);
    return this._http.post(`${this.apiEndPoint}`, categoryData);
    // return of({ message: 'Category created successfully!' }).pipe(
    //   delay(2000), // simulate 2-second API delay
    // );
  }

  updateCatgory(categoryData: ICreateCategory) {
    console.log('Category to update', categoryData);
  }

  getAllCategories() {
    return this._http.get<IFindAllCategoriesResponse>(`${this.apiEndPoint}`);
  }

  changeCategoryActiveState(id: string) {
    console.log('Category id to update state: ', id);
  }

  deleteCategoryById(id: string) {
    console.log('Category id to delete: ', id);
  }
}
