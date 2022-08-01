import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TodoDto, TodoReducerState } from '@teste/api-interfaces';
import { KeyTodoActions, TodoActions } from '../../store/todo.actions';

@Component({
  selector: 'teste-sub-todo-item',
  templateUrl: './sub-todo-item.component.html',
  styleUrls: ['./sub-todo-item.component.scss'],
})
export class SubTodoItemComponent implements OnInit, AfterViewInit {
  @Input() todo!: TodoDto;
  @Input() key!: string;

  checkForm = new FormControl<boolean>(false, { nonNullable: true });

  constructor(
    private store: Store<{
      [KeyTodoActions]: TodoReducerState;
    }>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.checkForm.setValue(this.todo.checked);
  }

  ngAfterViewInit(): void {
    this.updateTodo();
  }

  add() {
    this.store.dispatch(
      TodoActions.dialogOpen({ key: this.key + '/' + this.todo.uuid })
    );
  }

  editTodo() {
    this.store.dispatch(
      TodoActions.dialogOpen({
        key: this.key + '/' + this.todo.uuid,
        todo: this.todo,
      })
    );
  }

  updateTodo() {
    this.checkForm.valueChanges.subscribe((value) => {
      this.store.dispatch(
        TodoActions.updateSubTodo({
          key: this.key + '/' + this.todo.uuid,
          uuid: this.todo.uuid,
          todo: { ...this.todo, checked: value },
        })
      );
    });
  }

  deleteTodo() {
    this.store.dispatch(
      TodoActions.deleteSubTodo({
        key: this.key + '/' + this.todo.uuid,
        uuid: this.todo.uuid,
      })
    );
  }
}
