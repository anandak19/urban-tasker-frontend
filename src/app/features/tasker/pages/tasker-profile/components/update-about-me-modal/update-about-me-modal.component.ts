import { Component } from '@angular/core';
import { TextAreaFieldComponent } from '@shared/components/form/text-area-field/text-area-field.component';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';

@Component({
  selector: 'app-update-about-me-modal',
  imports: [TextAreaFieldComponent, ButtonLoadingComponent],
  templateUrl: './update-about-me-modal.component.html',
  styleUrl: './update-about-me-modal.component.scss',
})
export class UpdateAboutMeModalComponent {}
