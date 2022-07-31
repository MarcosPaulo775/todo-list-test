import { createReducer, on } from '@ngrx/store';
import { TodoReducerState } from '@teste/api-interfaces';
import { TodoActions } from './todo.actions';

const initialState: TodoReducerState = {
  list: [],
  loading: false,
  error: null,
};

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
      el._id === action.todo._id ? action.todo : el
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
    list: state.list.filter((el) => el._id !== action._id),
    error: null,
  })),
  on(TodoActions.deleteFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),

  on(TodoActions.reset, () => ({ ...initialState }))
);
