import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  sidebarOpen = signal(false);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  toggleSidebar() {
    this.sidebarOpen.update((value) => !value);
  }

  navigateBookTasker() {
    return this._router.navigate(['/book-tasker'], { relativeTo: this._route });
  }
}
