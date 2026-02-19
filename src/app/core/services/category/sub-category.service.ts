import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IApiResponseSuccess } from '@shared/models/api-response.model';
import { ISubCategoryCard } from '@shared/models/categories/subcategories.model';
import { IOptionResponse } from '@shared/models/common-api-responses.model';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {
  private readonly apiEndpoint = 'category';
  private _http = inject(HttpClient);

  getActiveSubcategoriesOptions(categoryId: string) {
    return this._http.get<IOptionResponse>(
      `${this.getUrl(categoryId)}/options`,
    );
  }

  getActiveSubCategories(categoryId: string) {
    return this._http.get<IApiResponseSuccess<ISubCategoryCard[]>>(
      `${this.getUrl(categoryId)}`,
    );
  }

  private getUrl(id: string) {
    return `${this.apiEndpoint}/${id}/subcategory`;
  }
}
