import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TodoDto, TodoReducerState } from '@teste/api-interfaces';
import { catchError, map, mergeMap, of } from 'rxjs';
import { v4 } from 'uuid';
import { InteractiveService } from '../../../core/services/interactive.service';
import { ConfirmService } from '../../../shared/components/confirm/confirm.service';
import { DialogAddComponent } from '../../dialog-add/dialog-add.component';
import { TodoListService } from '../todo-list.service';
import { KeyTodoActions, TodoActions } from './todo.actions';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private store: Store<{
      [KeyTodoActions]: TodoReducerState;
    }>,
    private dialog: MatDialog,
    private interactiveService: InteractiveService,
    private confirmService: ConfirmService,
    private todoListService: TodoListService
  ) {}

  read$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.read),
      mergeMap(() =>
        this.todoListService.read().pipe(
          map((todos) => TodoActions.readSuccess({ todos })),
          catchError(() => of(TodoActions.readFailed({ error: 'error' })))
        )
      )
    )
  );

  dialogOpen$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.dialogOpen),
      mergeMap((action) =>
        this.dialog
          .open(DialogAddComponent, {
            data: action.todo,
            disableClose: true,
            autoFocus: false,
          })
          .afterClosed()
          .pipe(
            map((resp?: TodoDto) => {
              if (resp) {
                return TodoActions.dialogSave({ todo: resp, key: action.key });
              }
              return TodoActions.dialogCancel();
            })
          )
      )
    )
  );

  dialogSave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.dialogSave),
      map((action) => {
        if (!action.key) {
          if (action.todo.uuid) {
            return TodoActions.update({
              uuid: action.todo.uuid,
              todo: action.todo,
            });
          }

          return TodoActions.create({
            todo: action.todo,
          });
        } else {
          if (action.todo.uuid) {
            return TodoActions.updateSubTodo({
              key: action.key,
              uuid: action.todo.uuid,
              todo: action.todo,
            });
          }

          return TodoActions.createSubTodo({
            key: action.key,
            todo: action.todo,
          });
        }
      })
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.create),
      mergeMap((action) =>
        this.todoListService.create({ ...action.todo, uuid: v4() }).pipe(
          map((todo: TodoDto) => {
            this.interactiveService.openSnackBar('Criado com sucesso!');
            return TodoActions.createSuccess({ todo });
          }),
          catchError((error: HttpErrorResponse) => {
            this.interactiveService.openSnackBar(error.statusText);
            return of(
              TodoActions.createFailed({
                error: error.statusText,
              })
            );
          })
        )
      )
    )
  );

  createSubTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.createSubTodo),
      map((action) =>
        TodoActions.createSubTodoSuccess({ todo: action.todo, key: action.key })
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.update),
      mergeMap((action) =>
        this.todoListService.update(action.uuid, action.todo).pipe(
          map((todo: TodoDto) => {
            this.interactiveService.openSnackBar('Atualizado com sucesso!');
            return TodoActions.updateSuccess({ todo });
          }),
          catchError((error: HttpErrorResponse) => {
            this.interactiveService.openSnackBar(error.statusText);
            return of(
              TodoActions.updateFailed({
                error: error.statusText,
              })
            );
          })
        )
      )
    )
  );

  updateSubTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateSubTodo),
      map((action) =>
        TodoActions.updateSubTodoSuccess({ todo: action.todo, key: action.key })
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.delete),
      mergeMap((action) =>
        this.confirmService
          .open('Tem certeza que deseja deletar este item ?')
          .pipe(
            map((confirm) => {
              if (!confirm) {
                return TodoActions.deleteCancel();
              }
              return TodoActions.deleteConfirm({
                uuid: action.uuid,
              });
            })
          )
      )
    )
  );

  deleteConfirm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteConfirm),
      mergeMap((action) =>
        this.todoListService.delete(action.uuid).pipe(
          map(() => {
            this.interactiveService.openSnackBar('Deletado com sucesso!');
            return TodoActions.deleteSuccess({
              uuid: action.uuid,
            });
          }),
          catchError((error: HttpErrorResponse) => {
            this.interactiveService.openSnackBar(error.statusText);
            return of(
              TodoActions.deleteFailure({
                error: error.statusText,
              })
            );
          })
        )
      )
    )
  );

  deleteSubTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteSubTodo),
      mergeMap((action) =>
        this.confirmService
          .open('Tem certeza que deseja deletar este item ?')
          .pipe(
            map((confirm) => {
              if (!confirm) {
                return TodoActions.deleteSubTodoCancel();
              }
              return TodoActions.deleteSubTodoSuccess({
                key: action.key,
                uuid: action.uuid,
              });
            })
          )
      )
    )
  );

  createSubTodoSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.createSubTodoSuccess),
      map((action) => TodoActions.selectTodoToUpdate({ key: action.key }))
    )
  );

  updateSubTodoSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateSubTodoSuccess),
      map((action) => TodoActions.selectTodoToUpdate({ key: action.key }))
    )
  );

  deleteSubTodoSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteSubTodoSuccess),
      map((action) => TodoActions.selectTodoToUpdate({ key: action.key }))
    )
  );

  selectTodoToUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.selectTodoToUpdate),
        concatLatestFrom(() => this.store.select(KeyTodoActions)),
        map(([action, state]) => {
          const list = state.list;
          const key = action.key.split('/');

          const index = list.findIndex((el) => el.uuid === key[0]);

          if (index !== -1) {
            const todo = list[index];
            this.store.dispatch(TodoActions.update({ uuid: todo.uuid, todo }));
          }
        })
      ),
    { dispatch: false }
  );
}
