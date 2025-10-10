import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-notification',
  imports: [MatIconModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  @Input() hasNotification: boolean = true
  @Output() isnoficationClicked = new EventEmitter()

  noficationClicked(){
    this.isnoficationClicked.emit()
  }

}
