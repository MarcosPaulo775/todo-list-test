import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TodoDto } from '@teste/api-interfaces';
import { Model, Types } from 'mongoose';

import { TodoDocument } from '../../shared/schema/todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel('todo') private todoModel: Model<TodoDocument>) {}

  async create(todoDto: TodoDto): Promise<TodoDto> {
    const objCreated = await this.todoModel.create({
      ...todoDto,
      _id: new Types.ObjectId(),
    });
    return this.todoDocumentToDto(objCreated);
  }

  async read(): Promise<TodoDto[]> {
    const objects = await this.todoModel.find({}).exec();
    return objects.map((el) => this.todoDocumentToDto(el));
  }

  async update(uuid: string, todoDto: TodoDto): Promise<TodoDto> {
    await this.todoModel
      .updateOne(
        {
          uuid,
        },
        {
          $set: {
            todo: todoDto.todo,
            checked: todoDto.checked,
            subTodo: todoDto.subTodo,
          },
        }
      )
      .exec();

    const objUpdated = await this.todoModel.findOne({ uuid }).exec();
    return this.todoDocumentToDto(objUpdated);
  }

  async delete(uuid: string): Promise<boolean> {
    const resp = await this.todoModel.deleteOne({ uuid }).exec();
    return resp.deletedCount === 1;
  }

  /* istanbul ignore next */
  todoDocumentToDto(todo: TodoDocument): TodoDto {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...todoDto } = todo.toJSON();
    return todoDto as TodoDto;
  }
}
