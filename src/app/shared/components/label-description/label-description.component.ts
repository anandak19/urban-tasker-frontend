import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label-description',
  imports: [],
  templateUrl: './label-description.component.html',
  styleUrl: './label-description.component.scss',
})
export class LabelDescriptionComponent {
  @Input() label!: string;
  @Input() description = '';
}
