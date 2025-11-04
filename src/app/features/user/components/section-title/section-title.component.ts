import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  imports: [CommonModule],
  templateUrl: './section-title.component.html',
  styleUrl: './section-title.component.scss',
})
export class SectionTitleComponent {
  @Input() title!: string;
  @Input() variant!: 'left' | 'center';
}
