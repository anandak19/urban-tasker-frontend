import { CanDeactivateFn } from '@angular/router';
import { ICanComponentDeactivate } from '@core/guards/guards.interface';

export const signupDirtyGuard: CanDeactivateFn<ICanComponentDeactivate> = (
  component,
) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
