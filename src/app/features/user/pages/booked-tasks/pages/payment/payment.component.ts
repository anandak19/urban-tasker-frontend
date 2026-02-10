import {
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { CommonModule, CurrencyPipe, Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PaymentService } from '@features/user/services/payment/payment.service';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IApiResponseError } from '@shared/models/api-response.model';
import { IPaymentInformation } from '@features/user/models/payment/payment-info.model';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import {
  IRazorpayOptions,
  IRazorpaySuccessResponse,
  IVarifyPayment,
} from '@features/user/models/payment/razorpay.model';
import { AuthGuardService } from '@core/services/auth-guard-service/auth-guard.service';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-payment',
  imports: [
    PageTitleComponent,
    FormsModule,
    ButtonLoadingComponent,
    BackButtonComponent,
    CommonModule,
    CurrencyPipe,
    ReactiveFormsModule,
    FormFieldComponent,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  @ViewChild('tipInput') tipInput!: FormFieldComponent;
  @Input() taskId!: string;
  tipAmount = signal<number | null>(null);
  tipPercentage = signal<number>(0);

  paymentInfo = signal<IPaymentInformation | null>(null);
  realPaymentInfo = signal<IPaymentInformation | null>(null);

  tipForm!: FormGroup;

  private _paymentService = inject(PaymentService);
  private _snackbar = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);
  private _fb = inject(FormBuilder);
  private _authService = inject(AuthGuardService);
  private _location = inject(Location);
  private _router = inject(Router);

  currentUser = this._authService.currentUser();

  /**
   * Add tip
   */
  addTipPercentage(percentage: number) {
    if (this.tipPercentage() == percentage) {
      this.tipPercentage.set(0);
      return;
    }

    this.resetTipForm();

    this.tipPercentage.set(percentage); // save tip percentage
    // calculate the tip amount from the total amount and percentage
    const amount = Math.floor(
      (percentage / 100) * this.realPaymentInfo()!.serviceFee,
    );
    const newTotalPayable = this.realPaymentInfo()!.subTotal + amount;
    this.tipAmount.set(amount); // save tip amount
    this.paymentInfo.update(
      (curr) =>
        ({
          ...curr,
          totalPayable: newTotalPayable,
          tipAmount: amount,
        }) as IPaymentInformation,
    );
    console.log(this.paymentInfo());
  }

  initTipForm() {
    this.tipForm = this._fb.group({
      tipAmount: ['', [Validators.required, Validators.min(0)]],
    });
  }

  resetTipForm() {
    this.tipForm.reset();
    this.tipForm.markAsPristine();
    this.tipForm.markAsUntouched();
    this.tipInput.resetControl();
  }

  submitCustomTip() {
    if (!this.tipForm.valid) {
      this.tipForm.markAllAsTouched();
      return;
    }

    this.tipPercentage.set(0); // reset tip percentage

    const tip = this.tipForm.get('tipAmount')?.value;
    this.tipAmount.set(tip); // update tip amount
    const newTotalPayable = tip
      ? this.realPaymentInfo()!.subTotal + Number(tip)
      : this.realPaymentInfo()!.totalPayable;

    // update tip in payment info
    this.paymentInfo.update(
      (curr) =>
        ({
          ...curr,
          tipAmount: tip,
          totalPayable: newTotalPayable,
        }) as IPaymentInformation,
    );
  }

  getPaymentInfo() {
    this._paymentService
      .getPaymentInfo(this.taskId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.paymentInfo.set(res.data);
          this.realPaymentInfo.set(res.data);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  onPayClicked() {
    console.log(this.tipAmount());
    // call create order  method
    this._paymentService
      .createOrder(this.taskId, this.tipAmount() ?? 0)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);

          // options
          const options: IRazorpayOptions = {
            key: environment.rzpKey, //  Razorpay Key ID
            amount: res.data.amountToPaidInMinorUnits,
            order_id: res.data.orderId,
            currency: 'INR',
            name: 'Urban Tasker',
            description: 'Test Transaction',
            handler: (response: IRazorpaySuccessResponse) => {
              this.varifyPayment(response, res.data.orderId);
            },
            prefill: {
              name: `${this.currentUser?.firstName ?? 'User'} ${this.currentUser?.lastName ?? 'name'}`,
              email: `${this.currentUser?.email ?? ''}`,
            },
            theme: {
              color: '#dba800',
            },
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  varifyPayment(response: IRazorpaySuccessResponse, orderId: string) {
    const payload: IVarifyPayment = {
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
      orderId,
    };
    // varify pay
    this._paymentService
      .varifyPayment(this.taskId, payload)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);
          this._snackbar.success('Payment Success');
          this._router.navigate([`/tasks/${this.taskId}`]);
        },
        error: (err: IApiResponseError) => {
          this._snackbar.error(err.message);
        },
      });
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.getPaymentInfo();
    this.initTipForm();
  }
}
