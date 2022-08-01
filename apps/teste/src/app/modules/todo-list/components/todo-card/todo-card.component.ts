import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TodoDto, TodoReducerState } from '@teste/api-interfaces';
import { KeyTodoActions, TodoActions } from '../../store/todo.actions';

@Component({
  selector: 'teste-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent implements OnInit, AfterViewInit {
  @Input() todo!: TodoDto;

  checkForm = new FormControl<boolean>(false, { nonNullable: true });

  constructor(
    private store: Store<{
      [KeyTodoActions]: TodoReducerState;
    }>
  ) {}

  ngOnInit(): void {
    this.checkForm.setValue(this.todo.checked);
  }

  ngAfterViewInit(): void {
    this.updateTodo();
  }

  add() {
    this.store.dispatch(TodoActions.dialogOpen({ key: this.todo.uuid }));
  }

  deleteTodo() {
    this.store.dispatch(TodoActions.delete({ uuid: this.todo.uuid }));
  }

  editTodo() {
    this.store.dispatch(TodoActions.dialogOpen({ todo: this.todo }));
  }

  updateTodo() {
    this.checkForm.valueChanges.subscribe((value) => {
      this.store.dispatch(
        TodoActions.update({
          uuid: this.todo.uuid,
          todo: { ...this.todo, checked: value },
        })
      );
    });
  }
}
