import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IOneCategoryResponse } from '@features/admin/models/api-response.model';

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
}
