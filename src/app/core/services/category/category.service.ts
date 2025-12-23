import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICategoryData } from '@features/admin/models/category.interface';
import { IApiResponseSuccess } from '@shared/models/api-response.model';
import { IOptionResponse } from '@shared/models/common-api-responses.model';
import { IDropdownOption } from '@shared/models/form-inputs.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiEndpoint = 'category';
  private _http = inject(HttpClient);

  getAllActiveSubCategories() {
    return this._http
      .get<IApiResponseSuccess<ICategoryData[]>>(this.apiEndpoint)
      .pipe(
        map((res) => {
          return res.data.map(
            (c): IDropdownOption => ({
              id: c.id,
              label: c.name,
            }),
          );
        }),
      );
  }

  getCategoryOptions() {
    return this._http.get<IOptionResponse>(`${this.apiEndpoint}/options`);
  }
}
