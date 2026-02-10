import { TestBed } from '@angular/core/testing';

import { TaskerApplicationsService } from './tasker-applications.service';

describe('TaskerApplicationsService', () => {
  let service: TaskerApplicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskerApplicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
