import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';

import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

import { todoDtoMock } from './todo.mock';

describe('TodoController', () => {
  let todoService: TodoService;
  let todoController: TodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getModelToken('todo'),
          useValue: Model,
        },
      ],
      controllers: [TodoController],
    }).compile();

    todoService = module.get(TodoService);
    todoController = module.get(TodoController);
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
    expect(todoController).toBeDefined();
  });

  describe('create', () => {
    it('sucess', async () => {
      jest
        .spyOn(todoService, 'create')
        .mockImplementation(async () => todoDtoMock);
      expect(await todoController.create(todoDtoMock)).toEqual(todoDtoMock);
    });
  });

  describe('read', () => {
    it('sucess', async () => {
      jest
        .spyOn(todoService, 'read')
        .mockImplementation(async () => [todoDtoMock]);
      expect(await todoController.read()).toEqual([todoDtoMock]);
    });
  });

  describe('update', () => {
    it('sucess', async () => {
      jest
        .spyOn(todoService, 'update')
        .mockImplementation(async () => todoDtoMock);
      expect(await todoController.update(todoDtoMock)).toEqual(todoDtoMock);
    });
  });

  describe('delete', () => {
    it('sucess', async () => {
      jest.spyOn(todoService, 'delete').mockImplementation(async () => true);
      expect(await todoController.delete('uuid')).toBeTruthy();
    });

    it('error', async () => {
      jest.spyOn(todoService, 'delete').mockImplementation(async () => false);
      expect(await todoController.delete('uuid')).toBeFalsy();
    });
  });
});
