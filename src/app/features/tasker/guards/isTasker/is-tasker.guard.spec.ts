import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isTaskerGuard } from './is-tasker.guard';

describe('isTaskerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => isTaskerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
