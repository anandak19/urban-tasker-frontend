import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { IListTasker } from '@features/user/models/tasker/tasker.model';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { TaskerListingCardComponent } from './components/tasker-listing-card/tasker-listing-card.component';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-choose-tasker',
  imports: [PageTitleComponent, TaskerListingCardComponent, ButtonComponent],
  templateUrl: './choose-tasker.component.html',
  styleUrl: './choose-tasker.component.scss',
})
export class ChooseTaskerComponent implements OnInit {
  @Output() prev = new EventEmitter();
  // sample data
  TASKERS: IListTasker[] = [
    {
      id: 't1',
      profileImageUrl:
        'https://img.freepik.com/premium-photo/profile-picture-young-caucasian-male-employee-posing-office-headshot-portrait-smiling-millennial-worker-company-intern-workplace-workspace-employment-leadership-hr-concept_704049-348.jpg',
      firstName: 'Arun',
      lastName: 'Kumar',
      hourlyRate: 350,
      totalRating: 4.6,
      bio: 'Experienced electrician specializing in residential wiring and repairs.',
    },
    {
      id: 't2',
      profileImageUrl:
        'https://img.freepik.com/premium-photo/profile-picture-young-caucasian-male-employee-posing-office-headshot-portrait-smiling-millennial-worker-company-intern-workplace-workspace-employment-leadership-hr-concept_704049-348.jpg',
      firstName: 'Suresh',
      lastName: 'Menon',
      hourlyRate: 300,
      totalRating: 4.4,
      bio: 'Professional plumber with 8+ years of experience in maintenance and installations.',
    },
    {
      id: 't3',
      profileImageUrl:
        'https://img.freepik.com/premium-photo/profile-picture-young-caucasian-male-employee-posing-office-headshot-portrait-smiling-millennial-worker-company-intern-workplace-workspace-employment-leadership-hr-concept_704049-348.jpg',
      firstName: 'Rahul',
      lastName: 'Nair',
      hourlyRate: 400,
      totalRating: 4.8,
      bio: 'Skilled carpenter known for precision furniture and interior woodwork.',
    },
    {
      id: 't4',
      profileImageUrl:
        'https://img.freepik.com/premium-photo/profile-picture-young-caucasian-male-employee-posing-office-headshot-portrait-smiling-millennial-worker-company-intern-workplace-workspace-employment-leadership-hr-concept_704049-348.jpg',
      firstName: 'Vijay',
      lastName: 'Das',
      hourlyRate: 250,
      totalRating: 4.2,
      bio: 'Reliable house cleaner offering deep cleaning and regular maintenance services.',
    },
    {
      id: 't5',
      profileImageUrl:
        'https://img.freepik.com/premium-photo/profile-picture-young-caucasian-male-employee-posing-office-headshot-portrait-smiling-millennial-worker-company-intern-workplace-workspace-employment-leadership-hr-concept_704049-348.jpg',
      firstName: 'Anil',
      lastName: 'Joseph',
      hourlyRate: 500,
      totalRating: 4.9,
      bio: 'Multi-skilled technician handling AC servicing, repairs, and appliance maintenance.',
    },
  ];

  availableTaskers = signal<IListTasker[]>([]);

  getTaskers() {
    this.availableTaskers.set(this.TASKERS);
  }

  onPrev() {
    this.prev.emit();
  }

  ngOnInit(): void {
    this.getTaskers();
  }
}
