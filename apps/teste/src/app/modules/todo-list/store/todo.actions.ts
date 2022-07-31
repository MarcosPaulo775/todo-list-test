import { createAction, props } from '@ngrx/store';
import { TodoDto } from '@teste/api-interfaces';

enum TodoActionsType {
  dialogOpen = '[todo] open dialog',
  dialogSave = '[todo] save dialog',
  dialogCancel = '[todo] cancel dialog',

  create = '[todo] create',
  createSuccess = '[todo] create success',
  createFailed = '[todo] create failed',

  read = '[todo] read',
  readSuccess = '[todo] read success',
  readFailed = '[todo] read failed',

  update = '[todo] update',
  updateSuccess = '[todo] update success',
  updateFailed = '[todo] update failed',

  delete = '[todo] delete',
  deleteConfirm = '[todo] delete confirm',
  deleteCancel = '[todo] delete cancel',
  deleteSuccess = '[todo] delete success',
  deleteFailure = '[todo] delete failure',

  reset = '[todo] reset',
}

export const KeyTodoActions = 'todo';
export const TodoActions = {
  dialogOpen: createAction(
    TodoActionsType.dialogOpen,
    props<{ todo?: TodoDto }>()
  ),
  dialogSave: createAction(
    TodoActionsType.dialogSave,
    props<{ todo: TodoDto }>()
  ),
  dialogCancel: createAction(TodoActionsType.dialogCancel),

  create: createAction(TodoActionsType.create, props<{ todo: TodoDto }>()),
  createSuccess: createAction(
    TodoActionsType.createSuccess,
    props<{ todo: TodoDto }>()
  ),
  createFailed: createAction(
    TodoActionsType.createFailed,
    props<{ error: string }>()
  ),

  read: createAction(TodoActionsType.read),
  readSuccess: createAction(
    TodoActionsType.readSuccess,
    props<{ todos: TodoDto[] }>()
  ),
  readFailed: createAction(
    TodoActionsType.readFailed,
    props<{ error: string }>()
  ),

  update: createAction(
    TodoActionsType.update,
    props<{ _id: string; todo: TodoDto }>()
  ),
  updateSuccess: createAction(
    TodoActionsType.updateSuccess,
    props<{ todo: TodoDto }>()
  ),
  updateFailed: createAction(
    TodoActionsType.updateFailed,
    props<{ error: string }>()
  ),

  delete: createAction(TodoActionsType.delete, props<{ _id: string }>()),
  deleteConfirm: createAction(
    TodoActionsType.deleteConfirm,
    props<{ _id: string }>()
  ),
  deleteCancel: createAction(TodoActionsType.deleteCancel),
  deleteSuccess: createAction(
    TodoActionsType.deleteSuccess,
    props<{ _id: string }>()
  ),
  deleteFailure: createAction(
    TodoActionsType.deleteFailure,
    props<{ error: string }>()
  ),

  reset: createAction(TodoActionsType.reset),
};
