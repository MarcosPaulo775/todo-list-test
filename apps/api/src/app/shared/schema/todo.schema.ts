import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ versionKey: false })
export class Todo {
  @Prop({ required: true })
  uuid: string;

  @Prop({ required: true })
  todo: string;

  @Prop({ required: false, default: false })
  checked: boolean;

  @Prop()
  subTodo: Todo[];
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
