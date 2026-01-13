import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-related-user-box',
  imports: [],
  templateUrl: './related-user-box.component.html',
  styleUrl: './related-user-box.component.scss',
})
export class RelatedUserBoxComponent {
  @Input() title!: string | null;
  @Input() label!: string;
}
