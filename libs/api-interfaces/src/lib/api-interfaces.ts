export interface TodoDto {
  _id: string;
  todo: string;
  checked: boolean;
  subTodo?: TodoDto[];
}

export interface TodoReducerState {
  list: TodoDto[];

  loading: boolean;
  error: string | null;
}
