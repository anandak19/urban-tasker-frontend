import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { noWhitespaceValidator } from '@shared/validators/custom-auth-validators';

@Component({
  selector: 'app-suspend-modal',
  imports: [FormFieldWrapperComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './suspend-modal.component.html',
  styleUrl: './suspend-modal.component.scss',
})
export class SuspendModalComponent implements OnInit {
  private _dialog = inject(DialogRef, { optional: true });

  reasonForm!: FormGroup;

  private _fb = inject(FormBuilder);

  initReasonForm() {
    this.reasonForm = this._fb.group({
      suspendedReason: ['', [Validators.required, noWhitespaceValidator]],
    });
  }

  onFormSubmit() {
    if (this.reasonForm.invalid) return;

    const reason = this.reasonForm.value.suspendedReason.trim();

    this.close(reason);
  }

  close(reason?: string) {
    this._dialog?.close(reason);
  }

  ngOnInit(): void {
    this.initReasonForm();
  }
}
