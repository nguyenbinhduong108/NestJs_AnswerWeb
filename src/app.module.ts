import { QuestionModule } from './objects/question/question.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountModule } from './objects/account/account.module';
import { ImgurModule } from './shared/UploadImage/imgur.module';
import { Type } from './entities/type.entity';
import { TypeModule } from './objects/type/type.module';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { AnswerModule } from './objects/answer/answer.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'mydatabase',
      entities: [Account, Type, Question, Answer],
      synchronize: true,
      // logging: ['query'],
    }),
    AccountModule,
    TypeModule,
    QuestionModule,
    AnswerModule,
    ImgurModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
