import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { MatChipListbox, MatChip } from '@angular/material/chips';
import { ITaskerAbout } from '@shared/models/tasker-data.model';

@Component({
  selector: 'app-profile-about-tasker',
  imports: [ButtonComponent, MatChipListbox, MatChip],
  templateUrl: './profile-about-tasker.component.html',
  styleUrl: './profile-about-tasker.component.scss',
})
export class ProfileAboutTaskerComponent implements OnInit {
  @Input() isEditable = false;
  @Input() taskerAbout = signal<ITaskerAbout | null>(null);
  @Output() getAboutData = new EventEmitter();

  ngOnInit(): void {
    console.log('About');
    this.getAboutData.emit();
  }
}
