import { createReducer, on } from '@ngrx/store';
import { TodoDto, TodoReducerState } from '@teste/api-interfaces';
import { v4 } from 'uuid';
import { TodoActions } from './todo.actions';

const initialState: TodoReducerState = {
  list: [],
  loading: false,
  error: null,
};

function addSubTodo(
  todoList: TodoDto[],
  key: string[],
  itemToAdd: TodoDto
): TodoDto[] | null {
  const index = todoList.findIndex((el) => el.uuid === key[0]);
  if (index !== -1) {
    if (key.length === 1) {
      todoList[index].subTodo.push(itemToAdd);
      return todoList;
    } else {
      const newKey = key.filter((el) => el !== key[0]);
      const aux = addSubTodo(todoList[index].subTodo, newKey, itemToAdd);
      if (aux) {
        todoList[index].subTodo = aux;
        return todoList;
      }
    }
  }

  return null;
}

function editSubTodo(
  todoList: TodoDto[],
  key: string[],
  updatedTodo: TodoDto
): TodoDto[] | null {
  const index = todoList.findIndex((el) => el.uuid === key[0]);
  if (index !== -1) {
    if (key.length === 1) {
      todoList[index] = updatedTodo;
      return todoList;
    } else {
      const newKey = key.filter((el) => el !== key[0]);
      const aux = editSubTodo(todoList[index].subTodo, newKey, updatedTodo);
      if (aux) {
        todoList[index].subTodo = aux;
        return todoList;
      }
    }
  }

  return null;
}

function deleteSubTodo(
  todoList: TodoDto[],
  key: string[],
  deletedUuid: string
): TodoDto[] | null {
  const index = todoList.findIndex((el) => el.uuid === key[0]);
  if (index !== -1) {
    if (key.length === 1) {
      todoList.splice(index, 1);

      return todoList;
    } else {
      const newKey = key.filter((el) => el !== key[0]);
      const aux = deleteSubTodo(todoList[index].subTodo, newKey, deletedUuid);
      if (aux) {
        todoList[index].subTodo = aux;
        return todoList;
      }
    }
  }

  return null;
}

export const TodoReducer = createReducer(
  initialState,

  on(TodoActions.create, (state) => ({
    ...state,
    error: null,
  })),
  on(TodoActions.createSuccess, (state, action) => ({
    ...state,
    list: [...state.list, action.todo],
    error: null,
  })),
  on(TodoActions.createFailed, (state, action) => ({
    ...state,
    error: action.error,
  })),

  on(TodoActions.read, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TodoActions.readSuccess, (state, action) => ({
    ...state,
    list: action.todos,
    loading: false,
    error: null,
  })),
  on(TodoActions.readFailed, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  on(TodoActions.update, (state) => ({
    ...state,
    error: null,
  })),
  on(TodoActions.updateSuccess, (state, action) => ({
    ...state,
    list: state.list.map((el) =>
      el.uuid === action.todo.uuid ? action.todo : el
    ),
    error: null,
  })),
  on(TodoActions.updateFailed, (state, action) => ({
    ...state,
    error: action.error,
  })),

  on(TodoActions.deleteConfirm, (state) => ({
    ...state,
    error: null,
  })),
  on(TodoActions.deleteSuccess, (state, action) => ({
    ...state,
    list: state.list.filter((el) => el.uuid !== action.uuid),
    error: null,
  })),
  on(TodoActions.deleteFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),

  // SubTodo

  on(TodoActions.createSubTodo, (state) => ({
    ...state,
    error: null,
  })),
  on(TodoActions.createSubTodoSuccess, (state, action) => {
    const keyArray = action.key.split('/');
    const newList = JSON.parse(JSON.stringify(state.list));
    const itemToAdd = { ...action.todo, uuid: v4() };

    const list = addSubTodo(newList, keyArray, itemToAdd);

    return {
      ...state,
      list: list ? list : [],
      error: null,
    };
  }),
  on(TodoActions.createSubTodoFailed, (state, action) => ({
    ...state,
    error: action.error,
  })),

  on(TodoActions.updateSubTodo, (state) => ({
    ...state,
    error: null,
  })),
  on(TodoActions.updateSubTodoSuccess, (state, action) => {
    const keyArray = action.key.split('/');
    const newList = JSON.parse(JSON.stringify(state.list));

    const list = editSubTodo(newList, keyArray, action.todo);

    return {
      ...state,
      list: list ? list : [],
      error: null,
    };
  }),
  on(TodoActions.updateSubTodoFailed, (state, action) => ({
    ...state,
    error: action.error,
  })),

  on(TodoActions.deleteSubTodoConfirm, (state) => ({
    ...state,
    error: null,
  })),
  on(TodoActions.deleteSubTodoSuccess, (state, action) => {
    const keyArray = action.key.split('/');
    const newList = JSON.parse(JSON.stringify(state.list));

    const list = deleteSubTodo(newList, keyArray, action.uuid);

    return {
      ...state,
      list: list ? list : [],
      error: null,
    };
  }),
  on(TodoActions.deleteSubTodoFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),

  on(TodoActions.reset, () => ({ ...initialState }))
);
