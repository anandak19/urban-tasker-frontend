import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { FormFieldWrapperComponent } from '@shared/components/form-field-wrapper/form-field-wrapper.component';
import { ITaskerApplication } from '@shared/models/tasker-applications.model';
import { InfoPanelComponent } from '@shared/components/ui/info-panel/info-panel.component';
import { MatDialog } from '@angular/material/dialog';
import { ImagePreviewModalComponent } from '@shared/components/ui/image-preview-modal/image-preview-modal.component';

@Component({
  selector: 'app-tasker-application-data',
  imports: [
    FormFieldWrapperComponent,
    CommonModule,
    TitleCasePipe,
    InfoPanelComponent,
  ],
  templateUrl: './tasker-application-data.component.html',
  styleUrl: './tasker-application-data.component.scss',
})
export class TaskerApplicationDataComponent {
  @Input() taskerApplicationData = signal<ITaskerApplication | null>(null);
  private _dialog = inject(MatDialog);

  onImagePreview(url: string) {
    if (!url) return;
    this._dialog.open(ImagePreviewModalComponent, { data: url });
  }
}
