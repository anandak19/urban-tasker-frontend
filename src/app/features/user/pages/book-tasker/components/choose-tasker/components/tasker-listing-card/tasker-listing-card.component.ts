import { Component } from '@angular/core';
import { IListTasker } from '@features/user/models/tasker/tasker.model';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-tasker-listing-card',
  imports: [ButtonComponent],
  templateUrl: './tasker-listing-card.component.html',
  styleUrl: './tasker-listing-card.component.scss',
})
export class TaskerListingCardComponent {
  tasker: IListTasker = {
    id: 't1',
    profileImageUrl:
      'https://img.freepik.com/premium-photo/profile-picture-young-caucasian-male-employee-posing-office-headshot-portrait-smiling-millennial-worker-company-intern-workplace-workspace-employment-leadership-hr-concept_704049-348.jpg',
    firstName: 'Arun',
    lastName: 'Kumar',
    hourlyRate: 350,
    totalRating: 4.6,
    bio: 'Experienced electrician specializing in residential wiring and repairs.',
  };
}
