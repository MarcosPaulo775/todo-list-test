import { createAction, props } from '@ngrx/store';
import { TodoDto } from '@teste/api-interfaces';

enum TodoActionsType {
  dialogOpen = '[todo] open dialog',
  dialogSave = '[todo] save dialog',
  dialogCancel = '[todo] cancel dialog',

  create = '[todo] create',
  createSuccess = '[todo] create success',
  createFailed = '[todo] create failed',

  createSubTodo = '[todo] create subTodo',
  createSubTodoSuccess = '[todo] create subTodo success',
  createSubTodoFailed = '[todo] create subTodo failed',

  read = '[todo] read',
  readSuccess = '[todo] read success',
  readFailed = '[todo] read failed',

  update = '[todo] update',
  updateSuccess = '[todo] update success',
  updateFailed = '[todo] update failed',

  updateSubTodo = '[todo] update subTodo',
  updateSubTodoSuccess = '[todo] update subTodo success',
  updateSubTodoFailed = '[todo] update subTodo failed',

  delete = '[todo] delete',
  deleteConfirm = '[todo] delete confirm',
  deleteCancel = '[todo] delete cancel',
  deleteSuccess = '[todo] delete success',
  deleteFailure = '[todo] delete failure',

  deleteSubTodo = '[todo] delete subTodo',
  deleteSubTodoConfirm = '[todo] delete subTodo confirm',
  deleteSubTodoCancel = '[todo] delete subTodo cancel',
  deleteSubTodoSuccess = '[todo] delete subTodo success',
  deleteSubTodoFailure = '[todo] delete subTodo failure',

  selectTodoToUpdate = '[todo] select todo to update',

  reset = '[todo] reset',
}

export const KeyTodoActions = 'todo';
export const TodoActions = {
  dialogOpen: createAction(
    TodoActionsType.dialogOpen,
    props<{ key?: string; todo?: TodoDto }>()
  ),
  dialogSave: createAction(
    TodoActionsType.dialogSave,
    props<{ key?: string; todo: TodoDto }>()
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

  createSubTodo: createAction(
    TodoActionsType.createSubTodo,
    props<{ key: string; todo: TodoDto }>()
  ),
  createSubTodoSuccess: createAction(
    TodoActionsType.createSubTodoSuccess,
    props<{ key: string; todo: TodoDto }>()
  ),
  createSubTodoFailed: createAction(
    TodoActionsType.createSubTodoFailed,
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
    props<{ uuid: string; todo: TodoDto }>()
  ),
  updateSuccess: createAction(
    TodoActionsType.updateSuccess,
    props<{ todo: TodoDto }>()
  ),
  updateFailed: createAction(
    TodoActionsType.updateFailed,
    props<{ error: string }>()
  ),

  updateSubTodo: createAction(
    TodoActionsType.updateSubTodo,
    props<{ key: string; uuid: string; todo: TodoDto }>()
  ),
  updateSubTodoSuccess: createAction(
    TodoActionsType.updateSubTodoSuccess,
    props<{ key: string; todo: TodoDto }>()
  ),
  updateSubTodoFailed: createAction(
    TodoActionsType.updateSubTodoFailed,
    props<{ key: string; error: string }>()
  ),

  delete: createAction(TodoActionsType.delete, props<{ uuid: string }>()),
  deleteConfirm: createAction(
    TodoActionsType.deleteConfirm,
    props<{ uuid: string }>()
  ),
  deleteCancel: createAction(TodoActionsType.deleteCancel),
  deleteSuccess: createAction(
    TodoActionsType.deleteSuccess,
    props<{ uuid: string }>()
  ),
  deleteFailure: createAction(
    TodoActionsType.deleteFailure,
    props<{ error: string }>()
  ),

  deleteSubTodo: createAction(
    TodoActionsType.deleteSubTodo,
    props<{ key: string; uuid: string }>()
  ),
  deleteSubTodoConfirm: createAction(
    TodoActionsType.deleteSubTodoConfirm,
    props<{ key: string; uuid: string }>()
  ),
  deleteSubTodoCancel: createAction(TodoActionsType.deleteSubTodoCancel),
  deleteSubTodoSuccess: createAction(
    TodoActionsType.deleteSubTodoSuccess,
    props<{ key: string; uuid: string }>()
  ),
  deleteSubTodoFailure: createAction(
    TodoActionsType.deleteSubTodoFailure,
    props<{ error: string }>()
  ),

  selectTodoToUpdate: createAction(
    TodoActionsType.selectTodoToUpdate,
    props<{ key: string }>()
  ),

  reset: createAction(TodoActionsType.reset),
};
