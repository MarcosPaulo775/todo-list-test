import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TodoDto } from '@teste/api-interfaces';
import { Model } from 'mongoose';
import { TodoDocument } from '../../shared/schema/todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel('todo') private todoModel: Model<TodoDocument>) {}

  async create(todoDto: TodoDto): Promise<TodoDto> {
    const objCreated = await this.todoModel.create(todoDto);

    return objCreated.toObject();
  }
}
