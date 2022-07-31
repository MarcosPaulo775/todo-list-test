import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TodoDto, TodoReducerState } from '@teste/api-interfaces';
import { catchError, map, mergeMap, of } from 'rxjs';
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
          })
          .afterClosed()
          .pipe(
            map((resp?: TodoDto) => {
              console.log(resp);
              if (resp) {
                return TodoActions.dialogSave({ todo: resp });
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
        if (action.todo._id) {
          return TodoActions.update({
            _id: action.todo._id,
            todo: action.todo,
          });
        }

        return TodoActions.create({
          todo: action.todo,
        });
      })
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.create),
      mergeMap((action) =>
        this.todoListService.create(action.todo).pipe(
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

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.update),
      mergeMap((action) =>
        this.todoListService.update(action._id, action.todo).pipe(
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
                _id: action._id,
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
        this.todoListService.delete(action._id).pipe(
          map(() => {
            this.interactiveService.openSnackBar('Deletado com sucesso!');
            return TodoActions.deleteSuccess({
              _id: action._id,
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
}
