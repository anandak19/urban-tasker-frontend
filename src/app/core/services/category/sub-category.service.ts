import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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

  private getUrl(id: string) {
    return `${this.apiEndpoint}/${id}/subcategory`;
  }
}
