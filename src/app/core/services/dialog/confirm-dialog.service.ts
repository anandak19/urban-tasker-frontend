import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  dialog = inject(MatDialog);

  ask(message: string): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message },
      enterAnimationDuration: '90ms',
    });

    return lastValueFrom(dialogRef.afterClosed());
  }
}
