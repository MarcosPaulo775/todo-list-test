import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class InteractiveService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string): void {
    this.snackBar.open(message, '❌', {
      duration: 3000,
    });
  }
}
