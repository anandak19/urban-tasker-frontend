import { Component, inject, OnInit, signal } from '@angular/core';
import {
  IGetAllUsersSuccessResponse,
  IUserData,
} from '@features/admin/models/user-data.interface';
import { UserManagementService } from '@features/admin/services/user-management/user-management.service';
import { PaginationComponent } from '@features/admin/components/pagination/pagination.component';
import { IPaginationMeta } from '@features/admin/models/common.interface';
import { TableListingComponent } from '@features/admin/components/table-listing/table-listing.component';
import { IMatColumns } from '@shared/interfaces/table.interface';

@Component({
  selector: 'app-users-management',
  imports: [PaginationComponent, TableListingComponent],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.scss',
})
export class UsersManagementComponent implements OnInit {
  private _usersManagementService = inject(UserManagementService);
  users!: IUserData[];
  pagination = signal<IPaginationMeta>({
    limit: 0,
    page: 1,
    pages: 1,
    total: 0,
  });

  //col
  userColumns: IMatColumns[] = [
    { label: 'First Name', key: 'firstName' },
    { label: 'Last Name', key: 'lastName' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' },
    { label: 'User Role', key: 'userRole' },
    { label: 'Tasker Applied', key: 'isTaskerApplied' },
  ] as const;

  getUsers(page: number) {
    this._usersManagementService.getAllUsers(page).subscribe({
      next: (res) => {
        const response = res as IGetAllUsersSuccessResponse;
        this.users = response.data.allUsers;
        this.pagination.set(response.data.metaData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onPageChange(page: number) {
    this.getUsers(page);
  }

  ngOnInit(): void {
    this.getUsers(1);
  }
}
