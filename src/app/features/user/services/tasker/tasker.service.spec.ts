import { TestBed } from '@angular/core/testing';

import { TaskerService } from './tasker.service';

describe('TaskerService', () => {
  let service: TaskerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
