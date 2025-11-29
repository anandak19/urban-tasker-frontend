import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { DropdownFieldComponent } from '@shared/components/dropdown-field/dropdown-field.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';

@Component({
  selector: 'app-update-status-component',
  imports: [
    ReactiveFormsModule,
    MatIcon,
    MatRadioModule,
    DropdownFieldComponent,
    ButtonLoadingComponent,
  ],
  templateUrl: './update-status-component.component.html',
  styleUrl: './update-status-component.component.scss',
})
export class UpdateStatusComponentComponent implements OnInit {
  statusForm!: FormGroup;

  private _fb = inject(FormBuilder);

  // initForm() {
  //   this.statusForm = this._fb.group({
  //     applicationStatus: ['approved', [Validators.required]],
  //     adminFeedback: ['', [Validators.required]],
  //   });
  // }

  // submit() {
  //   console.log(this.statusForm.value);
  //   this._dialogRef.close(this.statusForm.value);
  // }

  close() {
    console.log('mm');
  }

  ngOnInit(): void {
    // this.initForm();
    console.log('Modal Opened');
  }
}
