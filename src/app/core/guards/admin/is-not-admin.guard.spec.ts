import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isNotAdminGuard } from './is-not-admin.guard';

describe('isNotAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isNotAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
