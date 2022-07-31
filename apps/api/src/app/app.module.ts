import { Module } from '@nestjs/common';
import config from '../config';

import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.dbSystem, config.dbOptions),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
