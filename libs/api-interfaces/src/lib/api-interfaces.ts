export interface TodoDto {
  _id?: string;
  todo: string;
  checked: boolean;
  subTodo?: TodoDto[];
}
