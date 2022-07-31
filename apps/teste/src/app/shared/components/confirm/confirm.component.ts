import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

@Component({
  template: `
    <h1 mat-dialog-title>{{ text }}</h1>
    <mat-dialog-actions
      style="display: flex; flex-direction: row; justify-content: flex-end;"
    >
      <button mat-button (click)="onNot()" cdkFocusInitial>Não</button>
      <button mat-button (click)="onYes()">Sim</button>
    </mat-dialog-actions>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmComponent implements OnInit, OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public text?: string
  ) {}

  sub = new Subscription();

  ngOnInit(): void {
    this.sub.add(
      this.dialogRef.keydownEvents().subscribe((event) => {
        if (event?.key === 'Escape') {
          this.onNot();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onYes(): void {
    this.dialogRef.close(true);
  }

  onNot(): void {
    this.dialogRef.close(false);
  }
}
