import { Dialog } from '@angular/cdk/dialog';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ImagePreviewModalComponent } from '@shared/components/ui/image-preview-modal/image-preview-modal.component';
import { InfoPanelComponent } from '@shared/components/ui/info-panel/info-panel.component';
import { PageTitleComponent } from '@shared/components/ui/page-title/page-title.component';
import { ComplaintStatus } from '@shared/constants/enums/complaint-status.enum';

@Component({
  selector: 'app-complaint-details',
  imports: [
    CommonModule,
    TitleCasePipe,
    InfoPanelComponent,
    PageTitleComponent,
  ],
  templateUrl: './complaint-details.component.html',
  styleUrl: './complaint-details.component.scss',
})
export class ComplaintDetailsComponent {
  complaintStatus = ComplaintStatus;
  status: ComplaintStatus = this.complaintStatus.PENDING;
  images: string[] = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqbHHDlK_665l_E46bJA1G31pf_x4gveHvpA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqbHHDlK_665l_E46bJA1G31pf_x4gveHvpA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqbHHDlK_665l_E46bJA1G31pf_x4gveHvpA&s',
  ];

  private _dialog = inject(Dialog);

  onImageView(imageUrl: string) {
    this._dialog.open(ImagePreviewModalComponent, { data: imageUrl });
  }
}
