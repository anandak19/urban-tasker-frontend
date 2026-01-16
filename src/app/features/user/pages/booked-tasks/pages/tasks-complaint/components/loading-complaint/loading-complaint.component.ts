import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-complaint',
  imports: [MatProgressSpinner],
  templateUrl: './loading-complaint.component.html',
  styleUrl: './loading-complaint.component.scss',
})
export class LoadingComplaintComponent {}
