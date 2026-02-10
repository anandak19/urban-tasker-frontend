export interface IOrderResponse {
  orderId: string;
  userId: string;
  amountToPaidInMinorUnits: number;
  currency: string;
  status: 'created' | 'paid' | 'failed';
  receipt: string;
}

export interface IVarifyPayment {
  razorpayPaymentId: string;
  razorpaySignature: string;
  orderId: string;
}

export interface IRazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface IRazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  handler: (response: IRazorpaySuccessResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
}
