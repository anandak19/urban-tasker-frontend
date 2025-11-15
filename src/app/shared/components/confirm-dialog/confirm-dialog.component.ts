import { Component, inject, OnInit, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogTitle, MatDialogActions, MatButton],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent implements OnInit {
  dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA) as { message: string };

  isReady = signal(false);

  onYes() {
    this.dialogRef.close(true);
  }

  onNo() {
    this.dialogRef.close(false);
  }
  ngOnInit() {
    queueMicrotask(() => this.isReady.set(true));
  }
}
