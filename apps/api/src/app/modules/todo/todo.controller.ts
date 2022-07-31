import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoDto } from '@teste/api-interfaces';

import { TodoService } from './todo.service';

@Controller('/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  async create(@Body() todoDto: TodoDto): Promise<TodoDto> {
    return await this.todoService.create(todoDto);
  }
}
