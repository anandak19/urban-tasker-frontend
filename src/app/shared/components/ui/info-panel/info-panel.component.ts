import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-panel',
  imports: [],
  templateUrl: './info-panel.component.html',
  styleUrl: './info-panel.component.scss',
})
export class InfoPanelComponent {
  @Input() title!: string;
  @Input() description!: string;
}
