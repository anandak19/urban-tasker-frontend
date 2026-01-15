import { Component } from '@angular/core';
import { ComplaintFormComponent } from './components/complaint-form/complaint-form.component';
import { ComplaintDetailsComponent } from '@shared/components/feature/complaint-details/complaint-details.component';

@Component({
  selector: 'app-tasks-complaint',
  imports: [ComplaintFormComponent, ComplaintDetailsComponent],
  templateUrl: './tasks-complaint.component.html',
  styleUrl: './tasks-complaint.component.scss',
})
export class TasksComplaintComponent {}
