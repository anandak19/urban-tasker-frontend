import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-profile-tasker-portfolio',
  imports: [ButtonComponent, MatIconModule, CommonModule],
  templateUrl: './profile-tasker-portfolio.component.html',
  styleUrl: './profile-tasker-portfolio.component.scss',
})
export class ProfileTaskerPortfolioComponent implements OnInit {
  @Input() isEditable = false;
  @Output() isAddClicked = new EventEmitter();

  gallaryImages = signal<string[]>([]);

  onAddClick() {
    if (!this.isEditable) return;
    this.isAddClicked.emit();
  }

  ngOnInit(): void {
    console.log('Portfolio');

    this.gallaryImages.set([
      'https://i.pinimg.com/736x/90/e5/9f/90e59fc779d1313944e72bb0271f6bb2.jpg',
      'https://i.pinimg.com/736x/90/e5/9f/90e59fc779d1313944e72bb0271f6bb2.jpg',
      'https://i.pinimg.com/736x/90/e5/9f/90e59fc779d1313944e72bb0271f6bb2.jpg',
      'https://i.pinimg.com/736x/90/e5/9f/90e59fc779d1313944e72bb0271f6bb2.jpg',
      'https://i.pinimg.com/736x/90/e5/9f/90e59fc779d1313944e72bb0271f6bb2.jpg',
      'https://i.pinimg.com/736x/90/e5/9f/90e59fc779d1313944e72bb0271f6bb2.jpg',
      'https://i.pinimg.com/736x/90/e5/9f/90e59fc779d1313944e72bb0271f6bb2.jpg',
      'https://i.pinimg.com/736x/90/e5/9f/90e59fc779d1313944e72bb0271f6bb2.jpg',
    ]);
  }
}
