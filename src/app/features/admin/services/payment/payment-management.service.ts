import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IFindAllPaymentsResponse } from '@features/admin/models/api-response.model';
import {
  IListPayment,
  IListPaymentsQuery,
} from '@features/admin/models/payment.model';
import { IApiResponseSuccess } from '@shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentManagementService {
  private API_ENDPOINT = 'admin/payment';
  private _http = inject(HttpClient);

  findAllPayments(query: IListPaymentsQuery) {
    const params = new HttpParams({
      fromObject: {
        ...query,
      },
    });

    return this._http.get<IFindAllPaymentsResponse>(`${this.API_ENDPOINT}`, {
      params,
    });
  }

  findOnePayment(id: string) {
    return this._http.get<IApiResponseSuccess<IListPayment>>(
      `${this.API_ENDPOINT}/${id}`,
    );
  }
}
