import { getModelToken } from '@nestjs/mongoose';
import { TestingModule, Test } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Todo } from '../../shared/schema/todo.schema';
import { TodoService } from './todo.service';

import { todoDocumentMock, todoMock, todoDtoMock } from './todo.mock';

describe('TodoService', () => {
  let todoService: TodoService;
  let todoModel: Model<Todo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getModelToken('todo'),
          useValue: Model,
        },
      ],
    }).compile();

    todoService = module.get(TodoService);
    todoModel = module.get<Model<Todo>>(getModelToken('todo'));
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
    expect(todoModel).toBeDefined();
  });

  describe('create', () => {
    it('sucess', async () => {
      jest.spyOn(todoModel, 'create').mockImplementation(async () => todoMock);

      jest
        .spyOn(todoService, 'todoDocumentToDto')
        .mockImplementation(() => todoDtoMock);

      expect(await todoService.create(todoDtoMock)).toEqual(todoDtoMock);
    });
  });

  describe('read', () => {
    it('sucess', async () => {
      todoModel.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([todoDocumentMock]),
      });

      jest
        .spyOn(todoService, 'todoDocumentToDto')
        .mockImplementation(() => todoDtoMock);

      expect(await todoService.read()).toEqual([todoDtoMock]);
    });
  });

  describe('update', () => {
    it('sucess', async () => {
      todoModel.updateOne = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue({ ok: 1 }) });

      todoModel.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(todoDocumentMock),
      });

      jest
        .spyOn(todoService, 'todoDocumentToDto')
        .mockImplementation(() => todoDtoMock);

      expect(await todoService.update('uuid', todoDtoMock)).toEqual(
        todoDtoMock
      );
    });
  });

  describe('delete', () => {
    it('sucess', async () => {
      todoModel.deleteOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
      });
      expect(await todoService.delete('uuid')).toBeTruthy();
    });
    it('error', async () => {
      todoModel.deleteOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 0 }),
      });
      expect(await todoService.delete('uuid')).toBeFalsy();
    });
  });

  // describe('todoDocumentToDto', () => {
  //   it('sucess', () => {
  //     expect(todoService.todoDocumentToDto(todoDocumentMock)).toEqual(
  //       todoDtoMock
  //     );
  //   });
  // });
});
