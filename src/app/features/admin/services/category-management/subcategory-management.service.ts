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
export class SubcategoryManagementService {
  private _apiEndpoint = 'admin/category';

  private _http = inject(HttpClient);

  private url(categoryId: string) {
    return `${this._apiEndpoint}/${categoryId}/subcategory`;
  }

  /**
   * Create subcategory
   * @param categoryId
   * @param subcategoryData
   * @returns
   */
  addSubcategory(categoryId: string, subcategoryData: FormData) {
    return this._http.post<IOneCategoryResponse>(
      this.url(categoryId),
      subcategoryData,
    );
  }

  /**
   * Find all sub categories
   * @param categoryId
   * @returns
   */
  getSubcategories(categoryId: string, filters: IBaseFilters) {
    return this._http.get<IFindAllCategoriesResponse>(this.url(categoryId), {
      params: buildQuery(filters),
    });
  }

  getOneSubcategoryDetails(parentCategoryId: string, subcategoryId: string) {
    return this._http.get<IOneCategoryResponse>(
      `${this.url(parentCategoryId)}/${subcategoryId}`,
    );
  }

  changeSubcategoryIsActiveStatus(
    parentCategoryId: string,
    subcategoryId: string,
    isActive: boolean,
  ) {
    return this._http.patch<IOneCategoryResponse>(
      `${this.url(parentCategoryId)}/${subcategoryId}/status`,
      { isActive },
    );
  }

  deleteOneSubcategory(parentCategoryId: string, subcategoryId: string) {
    return this._http.delete<IBaseApiResponse>(
      `${this.url(parentCategoryId)}/${subcategoryId}`,
    );
  }

  updateSubcategory(
    parentCategoryId: string,
    subcategoryId: string,
    update: FormData,
  ) {
    return this._http.patch<IOneCategoryResponse>(
      `${this.url(parentCategoryId)}/${subcategoryId}`,
      update,
    );
  }
}
