import { Controller, Get } from '@nestjs/common';

import { Message } from '@teste/api-interfaces';

import { TodoService } from './todo.service';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('hello')
  getData(): Message {
    return this.todoService.getData();
  }
}
