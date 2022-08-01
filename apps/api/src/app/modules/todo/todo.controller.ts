import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoDto } from '@teste/api-interfaces';

import { TodoService } from './todo.service';

@Controller('/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() todoDto: TodoDto): Promise<TodoDto> {
    return await this.todoService.create(todoDto);
  }

  @Get()
  async read(): Promise<TodoDto[]> {
    return await this.todoService.read();
  }

  @Put()
  async update(@Body() todoDto: TodoDto): Promise<TodoDto> {
    return await this.todoService.update(todoDto.uuid, todoDto);
  }

  @Delete('/:_id')
  async delete(@Param('_id') _id: string): Promise<boolean> {
    return await this.todoService.delete(_id);
  }
}
