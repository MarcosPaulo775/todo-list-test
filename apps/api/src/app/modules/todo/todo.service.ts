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

  async update(_id: string, todoDto: TodoDto): Promise<TodoDto> {
    await this.todoModel
      .updateOne(
        {
          _id,
        },
        { $set: todoDto }
      )
      .exec();

    const objUpdated = await this.todoModel.findById(_id).exec();

    return this.todoDocumentToDto(objUpdated);
  }

  async delete(_id: string): Promise<boolean> {
    try {
      await this.todoModel.deleteOne({ _id }).exec();
      return true;
    } catch (e) {
      return false;
    }
  }

  todoDocumentToDto(todo: TodoDocument): TodoDto {
    const json = todo.toJSON();

    return {
      _id: json._id,
      todo: json.todo,
      checked: json.checked,
      subTodo: json.subTodo.map((el: TodoDocument) =>
        this.todoDocumentToDto(el)
      ),
    } as TodoDto;
  }
}
