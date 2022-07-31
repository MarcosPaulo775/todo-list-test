import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { map, Observable } from 'rxjs';
import { ConfirmComponent } from './confirm.component';

@Injectable()
export class ConfirmService {
  constructor(private dialog: MatDialog) {}

  open(text: string): Observable<boolean> {
    return this.dialog
      .open(ConfirmComponent, { data: text })
      .afterClosed()
      .pipe(map((e) => !!e));
  }
}
