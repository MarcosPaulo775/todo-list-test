import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TodoDto } from '@teste/api-interfaces';

@Component({
  selector: 'teste-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss'],
})
export class DialogAddComponent implements OnInit {
  isEdit = false;

  form = new FormGroup({
    uuid: new FormControl(),
    todo: new FormControl('', Validators.required),
    checked: new FormControl(false),
    subTodo: new FormControl<TodoDto[]>([]),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: TodoDto
  ) {}

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.dialogRef.close();
      } else if (event.key === 'Enter') {
        this.save();
      }
    });

    if (this.data) {
      this.isEdit = true;
      this.form.patchValue(this.data);
    }
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
