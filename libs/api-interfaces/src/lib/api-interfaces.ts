export interface TodoDto {
  uuid: string;
  todo: string;
  checked: boolean;
  subTodo: TodoDto[];
}

export interface TodoReducerState {
  list: TodoDto[];

  loading: boolean;
  error: string | null;
}
