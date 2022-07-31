export interface Message {
  message: string;
}

export interface Todo {
  _id?: string;
  todo: string;
  checked: boolean;
  subTodo?: Todo[];
}
