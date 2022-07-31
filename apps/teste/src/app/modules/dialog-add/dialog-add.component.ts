import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Todo } from '@teste/api-interfaces';
@Component({
  selector: 'teste-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss'],
})
export class DialogAddComponent implements OnInit {
  isEdit = false;

  form = new FormGroup({
    _id: new FormControl(),
    todo: new FormControl(''),
    checked: new FormControl(false),
    subTodo: new FormControl<Todo[]>([]),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Todo
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.isEdit = true;
      this.form.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
