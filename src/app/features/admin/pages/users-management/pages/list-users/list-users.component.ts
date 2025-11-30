import { Component, inject, OnInit, signal } from '@angular/core';
import { IPaginationMeta } from '@features/admin/models/common.interface';
import {
  IUserData,
  IGetAllUsersSuccessResponse,
} from '@features/admin/models/user-data.interface';
import { UserManagementService } from '@features/admin/services/user-management/user-management.service';
import { IMatColumns } from '@shared/interfaces/table.interface';
import { AdminPageTitleComponent } from '@features/admin/components/admin-page-title/admin-page-title.component';
import { TableListingComponent } from '@features/admin/components/table-listing/table-listing.component';
import { PaginationComponent } from '@features/admin/components/pagination/pagination.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  imports: [
    AdminPageTitleComponent,
    TableListingComponent,
    PaginationComponent,
  ],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss',
})
export class ListUsersComponent implements OnInit {
  private _usersManagementService = inject(UserManagementService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
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

  onViewClick(id: string) {
    this._router.navigate([`${id}`], { relativeTo: this._route });
  }

  onPageChange(page: number) {
    this.getUsers(page);
  }

  ngOnInit(): void {
    this.getUsers(1);
  }
}
