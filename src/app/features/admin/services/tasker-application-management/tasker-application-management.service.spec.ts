import { TestBed } from '@angular/core/testing';

import { TaskerApplicationManagementService } from './tasker-application-management.service';

describe('TaskerApplicationManagementService', () => {
  let service: TaskerApplicationManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskerApplicationManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
