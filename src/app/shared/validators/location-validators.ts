import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const locationRequiredValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const lat = control.get('latitude')?.value;
  const lng = control.get('longitude')?.value;

  if (!lat || !lng) {
    return { locationRequired: true };
  }

  return null;
};
