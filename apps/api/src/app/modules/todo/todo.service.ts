import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '@teste/api-interfaces';
import { Model } from 'mongoose';
import { TodoDocument } from '../../shared/schema/todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel('todo') private todoModel: Model<TodoDocument>) {}

  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
