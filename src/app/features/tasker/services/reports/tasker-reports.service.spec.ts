import { TestBed } from '@angular/core/testing';

import { TaskerReportsService } from './tasker-reports.service';

describe('TaskerReportsService', () => {
  let service: TaskerReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskerReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
