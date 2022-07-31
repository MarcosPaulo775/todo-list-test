import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfirmComponent } from './confirm.component';
import { ConfirmService } from './confirm.service';

@NgModule({
  declarations: [ConfirmComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  providers: [ConfirmService],
  exports: [],
})
export class ConfirmModule {}
