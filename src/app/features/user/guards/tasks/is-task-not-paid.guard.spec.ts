import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isTaskNotPaidGuard } from './is-task-not-paid.guard';

describe('isTaskNotPaidGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => isTaskNotPaidGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
