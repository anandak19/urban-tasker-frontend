import { Dialog } from '@angular/cdk/dialog';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ImagePreviewModalComponent } from '@shared/components/ui/image-preview-modal/image-preview-modal.component';
import { InfoPanelComponent } from '@shared/components/ui/info-panel/info-panel.component';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { IComplaintDetails } from '@shared/models/complaint/complaint.model';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';

@Component({
  selector: 'app-complaint-details',
  imports: [
    CommonModule,
    TitleCasePipe,
    InfoPanelComponent,
    PageTitleComponent,
    BackButtonComponent,
  ],
  templateUrl: './complaint-details.component.html',
  styleUrl: './complaint-details.component.scss',
})
export class ComplaintDetailsComponent {
  @Input() complaintDetails!: IComplaintDetails | null; // use this and remove others

  private _dialog = inject(Dialog);

  onImageView(imageUrl: string) {
    this._dialog.open(ImagePreviewModalComponent, { data: imageUrl });
  }
}
