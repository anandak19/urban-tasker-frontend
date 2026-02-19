import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICategoryData } from '@features/admin/models/category.interface';
import { IApiResponseSuccess } from '@shared/models/api-response.model';
import { ICategoryCard } from '@shared/models/categories/categories.model';
import { IOptionResponse } from '@shared/models/common-api-responses.model';
import { IOptionData } from '@shared/models/form-inputs.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly API_ENDPOINT = 'category';
  private _http = inject(HttpClient);

  getAllActiveSubCategories() {
    return this._http
      .get<IApiResponseSuccess<ICategoryData[]>>(this.API_ENDPOINT)
      .pipe(
        map((res) => {
          return res.data.map(
            (c): IOptionData => ({
              id: c.id,
              label: c.name,
            }),
          );
        }),
      );
  }

  getActiveCategories() {
    return this._http.get<IApiResponseSuccess<ICategoryCard[]>>(
      `${this.API_ENDPOINT}`,
    );
  }

  getCategoryOptions() {
    return this._http.get<IOptionResponse>(`${this.API_ENDPOINT}/options`);
  }
}
