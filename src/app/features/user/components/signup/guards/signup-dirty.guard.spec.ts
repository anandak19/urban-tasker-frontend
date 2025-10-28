import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { signupDirtyGuard } from './signup-dirty.guard';

describe('signupDirtyGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) =>
    TestBed.runInInjectionContext(() => signupDirtyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
