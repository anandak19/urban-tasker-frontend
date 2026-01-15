import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-image-preview-modal',
  imports: [],
  templateUrl: './image-preview-modal.component.html',
  styleUrl: './image-preview-modal.component.scss',
})
export class ImagePreviewModalComponent {
  imageUrl = inject<string>(DIALOG_DATA);
  dialogRef = inject(DialogRef);

  close() {
    this.dialogRef.close();
  }
}
