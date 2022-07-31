import { Module } from '@nestjs/common';
import config from '../config';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(config.dbSystem, config.dbOptions)],
  controllers: [],
  providers: [],
})
export class AppModule {}
