import { Component, EventEmitter, Output } from '@angular/core';
import { IDemoLoginData, tasker_cred, user_cred } from '@shared/demo/demo-cred';
import { ILoginData } from '@shared/models/auth.model';

@Component({
  selector: 'app-demo-platform-login',
  imports: [],
  templateUrl: './demo-platform-login.component.html',
  styleUrl: './demo-platform-login.component.scss',
})
export class DemoPlatformLoginComponent {
  demoTasker: IDemoLoginData = tasker_cred;
  demoUser: IDemoLoginData = user_cred;
  @Output() login = new EventEmitter<ILoginData>();

  onDemoLogin(demoLoginData: IDemoLoginData) {
    const demoCred: ILoginData = {
      email: demoLoginData.email,
      password: demoLoginData.password,
    };

    this.login.emit(demoCred);
  }
}
