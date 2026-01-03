import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { TextAreaFieldComponent } from '@shared/components/form/text-area-field/text-area-field.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ITaskerAbout } from '@shared/models/tasker-data.model';
import { TaskerProfileService } from '@features/tasker/services/tasker-profile/tasker-profile.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IApiResponseError } from '@shared/models/api-response.model';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-update-about-me-modal',
  imports: [
    TextAreaFieldComponent,
    ButtonLoadingComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './update-about-me-modal.component.html',
  styleUrl: './update-about-me-modal.component.scss',
})
export class UpdateAboutMeModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(DialogRef);
  private _destroyRef = inject(DestroyRef);
  private _taskerProfileService = inject(TaskerProfileService);
  private _snackbarService = inject(SnackbarService);

  readonly data = inject<Signal<ITaskerAbout | null>>(DIALOG_DATA);
  aboutForm!: FormGroup;

  constructor() {
    this.patchFormIfDataExists();
  }

  private initForm(): void {
    this.aboutForm = this.fb.group({
      about: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  private patchFormIfDataExists(): void {
    effect(() => {
      const aboutData = this.data();

      if (aboutData) {
        this.aboutForm.patchValue({
          about: aboutData.about,
        });
      }
    });
  }

  submit(): void {
    if (this.aboutForm.invalid) return;
    const updatedAbout = this.aboutForm.value.about?.trim();
    console.log(this.aboutForm.value.about);
    const payload: ITaskerAbout = {
      about: updatedAbout,
    };
    // call the method to change ht eabout here
    this._taskerProfileService
      .updateTaskerAbout(payload)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.dialogRef.close(updatedAbout);
          this._snackbarService.success(res.message);
        },
        error: (err: IApiResponseError) => {
          this._snackbarService.error(err.message);
        },
      });
  }

  ngOnInit(): void {
    this.initForm();
  }
}
