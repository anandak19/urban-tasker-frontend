import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  IFindAllCategoriesResponse,
  IOneCategoryResponse,
} from '@features/admin/models/api-response.model';
import { buildQuery } from '@shared/helpers/query-builder';
import { IBaseApiResponse } from '@shared/models/api-response.model';
import { IBaseFilters } from '@shared/models/request-data.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryManagementService {
  private apiEndPoint = 'admin/category';
  private _http = inject(HttpClient);

  addCategory(categoryData: FormData) {
    console.log('Category to add', categoryData);
    return this._http.post(`${this.apiEndPoint}`, categoryData);
  }

  updateCatgory(id: string, categoryData: FormData) {
    return this._http.patch<IOneCategoryResponse>(
      `${this.apiEndPoint}/${id}`,
      categoryData,
    );
  }

  getAllCategories(query: IBaseFilters) {
    console.log('par', buildQuery(query));

    return this._http.get<IFindAllCategoriesResponse>(`${this.apiEndPoint}`, {
      params: buildQuery(query),
    });
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
