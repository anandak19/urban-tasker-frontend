import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { ITaskerApplication } from '@shared/models/tasker-applications.model';
import { InfoPanelComponent } from "@shared/components/ui/info-panel/info-panel.component";

@Component({
  selector: 'app-tasker-application-data',
  imports: [FormFieldWrapperComponent, CommonModule, TitleCasePipe, InfoPanelComponent],
  templateUrl: './tasker-application-data.component.html',
  styleUrl: './tasker-application-data.component.scss',
})
export class TaskerApplicationDataComponent {
  @Input() taskerApplicationData = signal<ITaskerApplication | null>(null);
}
