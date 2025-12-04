import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { BackButtonComponent } from '@features/admin/components/back-button/back-button.component';
import { IUserData } from '@features/admin/models/user-data.interface';
import { UserManagementService } from '@features/admin/services/user-management/user-management.service';
import { UserDataComponent } from '@shared/components/feature/user-data/user-data.component';
import { IApiResponseError } from '@shared/models/api-response.model';
import { InfoPanelComponent } from '@shared/components/ui/info-panel/info-panel.component';
import { TitleCasePipe } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { SuspendModalComponent } from '../../components/suspend-modal/suspend-modal.component';
import { ConfirmDialogService } from '@core/services/dialog/confirm-dialog.service';
import { ButtonLoadingComponent } from '@shared/components/button-loading/button-loading.component';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-view-one-user',
  imports: [
    AdminPageTitleComponent,
    BackButtonComponent,
    UserDataComponent,
    InfoPanelComponent,
    TitleCasePipe,
    ButtonLoadingComponent,
  ],
  templateUrl: './view-one-user.component.html',
  styleUrl: './view-one-user.component.scss',
})
export class ViewOneUserComponent implements OnInit {
  @Input() userId!: string;

  userData = signal<IUserData | null>(null);

  isSuspendLoading = signal<boolean>(false);

  private _userManagement = inject(UserManagementService);
  private _dialog = inject(Dialog);
  private _confirmDialog = inject(ConfirmDialogService);
  private _snackbar = inject(SnackbarService);

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

  async unsuspendUser() {
    const yes = await this._confirmDialog.ask(
      'Are you sure to un-suspend the user ?',
    );

    if (yes) {
      // userId
      this._userManagement.unsuspendUser(this.userId).subscribe({
        next: (res) => {
          console.log(res);
          this.userData.set(res.data);
          this._snackbar.success('Un-Suspended User successfully');
        },
        error: (err: IApiResponseError) => {
          console.log(err);
          this._snackbar.error(err.message);
        },
      });
    }
  }

  onSuspendBtnClick() {
    if (this.userData()?.isSuspended) {
      this.unsuspendUser();
    } else {
      const dialogRef = this._dialog.open(SuspendModalComponent, {
        disableClose: true,
        width: '450px',
      });

      dialogRef.closed.subscribe((reason) => {
        if (reason) this.suspendUser(reason as string);
      });
    }
  }

  suspendUser(reason: string) {
    this._userManagement.suspendUser(this.userId, reason).subscribe({
      next: (res) => {
        this.userData.set(res.data);
        this._snackbar.success('Suspended user successfully');
      },
      error: (err: IApiResponseError) => {
        this._snackbar.error(err.message);
      },
    });
  }

  ngOnInit(): void {
    this.getUserData();
  }
}
