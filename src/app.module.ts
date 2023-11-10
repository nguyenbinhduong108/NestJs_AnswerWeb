import { QuestionModule } from './objects/question/question.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountModule } from './objects/account/account.module';
import { ImgurModule } from './shared/UploadImage/imgur.module';
import { Category } from './entities/category.entity';
import { CategoryModule } from './objects/category/category.module';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { AnswerModule } from './objects/answer/answer.module';
import * as fs from 'fs';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: '127.0.0.1',
      host: '192.168.1.6',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'mydatabase',

      entities: [Account, Category, Question, Answer],
      synchronize: true,
      // logging: ['query'],
    }),
    AccountModule,
    CategoryModule,
    QuestionModule,
    AnswerModule,
    ImgurModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
