import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { TodoReducerState } from '@teste/api-interfaces';
import { KeyTodoActions, TodoActions } from './store/todo.actions';

@Component({
  selector: 'teste-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  constructor(
    private store: Store<{
      [KeyTodoActions]: TodoReducerState;
    }>,
    public dialog: MatDialog
  ) {}

  todoListState$ = this.store.select(KeyTodoActions);

  ngOnInit() {
    this.store.dispatch(TodoActions.read());
  }

  add() {
    this.store.dispatch(TodoActions.dialogOpen({}));
  }
}
