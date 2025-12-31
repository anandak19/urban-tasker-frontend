import { TestBed } from '@angular/core/testing';

import { TaskerProfileService } from './tasker-profile.service';

describe('TaskerProfileService', () => {
  let service: TaskerProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskerProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
