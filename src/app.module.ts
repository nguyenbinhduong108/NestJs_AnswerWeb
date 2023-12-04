import { QuestionModule } from './objects/question/question.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountModule } from './objects/account/account.module';
import { ImgurModule } from './shared/uploadImage/imgur.module';
import { Category } from './entities/category.entity';
import { CategoryModule } from './objects/category/category.module';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { AnswerModule } from './objects/answer/answer.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
  ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
      type: 'mysql',

      host: 'mysql-547bab7-answerquestion-web.a.aivencloud.com',
      port: 14417,
      username: 'avnadmin',
      password: 'AVNS_I-VqybU_lp3A_W0tud3',
      database: 'mydatabase',
      entities: [Account, Category, Question, Answer],
      synchronize: true,
      // logger: 'simple-console',
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
export class AppModule{}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .forRoutes({ path: '/*', method: RequestMethod.ALL})
//   }
// }
