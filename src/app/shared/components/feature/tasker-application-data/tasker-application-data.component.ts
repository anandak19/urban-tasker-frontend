import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { ITaskerApplication } from '@shared/models/tasker-applications.model';

@Component({
  selector: 'app-tasker-application-data',
  imports: [FormFieldWrapperComponent, CommonModule, TitleCasePipe],
  templateUrl: './tasker-application-data.component.html',
  styleUrl: './tasker-application-data.component.scss',
})
export class TaskerApplicationDataComponent {
  @Input() taskerApplicationData = signal<ITaskerApplication | null>(null);
}
