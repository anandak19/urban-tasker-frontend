import { HttpParams } from '@angular/common/http';
import { IBaseFilters } from '@shared/models/request-data.model';

export const buildQuery = (filter: IBaseFilters) => {
  let params = new HttpParams();

  Object.keys(filter).forEach((filterKey) => {
    const key = filterKey as keyof IBaseFilters;
    const value = filter[key];

    if (value !== null && value !== undefined && value !== '') {
      params = params.set(key, value as string | number);
    }
  });

  return params;
};
