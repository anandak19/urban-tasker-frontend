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
import { AdminTableFiltersComponent } from '@features/admin/components/admin-table-filters/admin-table-filters.component';
import { IOptionData } from '@shared/models/form-inputs.model';
import { UserRoles } from '@shared/constants/enums/user.enum';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { IUserFilter } from '@features/admin/models/user-filter.model';

@Component({
  selector: 'app-list-users',
  imports: [
    AdminPageTitleComponent,
    TableListingComponent,
    PaginationComponent,
    AdminTableFiltersComponent,
    DropdownComponent,
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

  filter = signal<IUserFilter>({
    page: 1,
    role: null,
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

  userRoleOptions = signal<IOptionData[]>([
    { id: '', label: 'All' },
    { id: UserRoles.USER, label: 'User' },
    { id: UserRoles.TASKER, label: 'Tasker' },
  ]);

  onOptionSelect(option: IOptionData) {
    this.filter.update((current) => ({
      ...current,
      role: (option?.id as UserRoles) ? (option.id as UserRoles) : null,
      page: 1,
    }));
    this.getUsers();
  }

  getUsers() {
    this._usersManagementService.getAllUsers(this.filter()).subscribe({
      next: (res) => {
        const response = res as IGetAllUsersSuccessResponse;
        this.users = response.data.allUsers;
        console.log(response.data.allUsers);
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

  onSearch(search: string) {
    this.filter.update((val) => ({
      ...val,
      page: 1,
      search,
    }));
    console.log(`Search: ${search} find it`);
    this.getUsers();
  }

  onPageChange(page: number) {
    this.filter.update((val) => ({
      ...val,
      page,
    }));
    this.getUsers();
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
