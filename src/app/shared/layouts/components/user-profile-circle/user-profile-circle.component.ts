import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-profile-circle',
  imports: [],
  templateUrl: './user-profile-circle.component.html',
  styleUrl: './user-profile-circle.component.scss',
})
export class UserProfileCircleComponent {
  @Output() clickProfile = new EventEmitter();
  imageUrl = 'https://imgflip.com/s/meme/Smiling-Cat.jpg';

  profileClicked() {
    this.clickProfile.emit();
  }
}
