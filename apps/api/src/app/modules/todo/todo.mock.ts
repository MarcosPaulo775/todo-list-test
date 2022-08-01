import { TodoDto } from '@teste/api-interfaces';
import { Types } from 'mongoose';
import { Todo, TodoDocument } from '../../shared/schema/todo.schema';

export const todoDocumentMock = {
  _id: new Types.ObjectId(),
  uuid: 'uuid',
  todo: 'todo',
  checked: false,
  subTodo: [
    {
      uuid: 'uuid',
      todo: 'todo',
      checked: false,
      subTodo: [],
    },
  ],
} as TodoDocument;

export const todoMock = {
  uuid: 'uuid',
  todo: 'todo',
  checked: false,
  subTodo: [{ uuid: 'uuid', todo: 'todo', checked: false, subTodo: [] }],
} as Todo;

export const todoDtoMock = {
  uuid: 'uuid',
  todo: 'todo',
  checked: false,
  subTodo: [{ uuid: 'uuid', todo: 'todo', checked: false, subTodo: [] }],
} as TodoDto;
