import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPaymentInformation } from '@features/user/models/payment/payment-info.model';
import {
  IOrderResponse,
  IVarifyPayment,
} from '@features/user/models/payment/razorpay.model';
import { IApiResponseSuccess } from '@shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly API_ENDPOINT = 'payment';

  private _http = inject(HttpClient);

  getPaymentInfo(taskId: string) {
    return this._http.get<IApiResponseSuccess<IPaymentInformation>>(
      `${this.API_ENDPOINT}/${taskId}/info`,
    );
  }

  createOrder(taskId: string, tipAmount?: number) {
    return this._http.post<IApiResponseSuccess<IOrderResponse>>(
      `${this.API_ENDPOINT}/create-order`,
      { taskId, tipAmount },
    );
  }

  varifyPayment(taskId: string, payload: IVarifyPayment) {
    console.log('Passing in id', taskId);
    return this._http.post(
      `${this.API_ENDPOINT}/varify-payment/${taskId}`,
      payload,
    );
  }
}
