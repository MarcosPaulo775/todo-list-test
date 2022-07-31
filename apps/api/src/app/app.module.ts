import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  // imports: [MongooseModule.forRoot(config.dbSystem, config.dbOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
