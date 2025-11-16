import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  IFindAllCategoriesResponse,
  IOneCategoryResponse,
} from '@features/admin/models/api-response.model';
import { ICreateCategory } from '@features/admin/models/category.interface';
import { IBaseApiResponse } from '@shared/models/api-response.model';
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

  getCategoryDataById(id: string) {
    return this._http.get<IOneCategoryResponse>(`${this.apiEndPoint}/${id}`);
  }

  changeCategoryActiveState(id: string, isActive: boolean) {
    return this._http.patch<IOneCategoryResponse>(
      `${this.apiEndPoint}/${id}/status`,
      {
        isActive,
      },
    );
  }

  deleteCategoryById(id: string) {
    return this._http.delete<IBaseApiResponse>(`${this.apiEndPoint}/${id}`);
  }
}
