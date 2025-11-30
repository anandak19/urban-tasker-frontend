import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { IUserData } from '@features/admin/models/user-data.interface';
import { UserManagementService } from '@features/admin/services/user-management/user-management.service';
import { UserDataComponent } from '@shared/components/feature/user-data/user-data.component';
import { IApiResponseError } from '@shared/models/api-response.model';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InfoPanelComponent } from '@shared/components/ui/info-panel/info-panel.component';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-view-one-user',
  imports: [
    AdminPageTitleComponent,
    BackButtonComponent,
    UserDataComponent,
    ButtonComponent,
    InfoPanelComponent,
    TitleCasePipe,
  ],
  templateUrl: './view-one-user.component.html',
  styleUrl: './view-one-user.component.scss',
})
export class ViewOneUserComponent implements OnInit {
  @Input() userId!: string;

  userData = signal<IUserData | null>(null);

  private _userManagement = inject(UserManagementService);

  getUserData() {
    this._userManagement.getUserById(this.userId).subscribe({
      next: (res) => {
        console.log(res.data);
        this.userData.set(res.data);
      },
      error: (err: IApiResponseError) => {
        console.log(err);
      },
    });
  }

  get fullName() {
    return this.userData()
      ? `${this.userData()?.firstName} ${this.userData()?.lastName}`
      : '';
  }

  ngOnInit(): void {
    this.getUserData();
  }
}
