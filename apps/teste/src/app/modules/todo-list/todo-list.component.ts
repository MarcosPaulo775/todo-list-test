import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Todo } from '@teste/api-interfaces';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';

@Component({
  selector: 'teste-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  list: Todo[] = [
    {
      todo: 'ab312312i312u312p3g12u3g21uy3g12uy3c',
      checked: false,
      subTodo: [
        { todo: 'a', checked: true },
        { todo: 'b', checked: true },
      ],
    },
    {
      todo: 'cde',
      checked: false,
      subTodo: [
        { todo: 'e', checked: true },
        { todo: 'c', checked: false },
      ],
    },
    { todo: 'ddqwd', checked: true },
  ];

  constructor(public dialog: MatDialog) {}

  add() {
    this.dialog.open(DialogAddComponent);
  }
}
