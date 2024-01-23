import { QuestionModule } from './objects/question/question.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
import { LoggerMiddleware } from './logger/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { Leaderboard } from './entities/leaderboard.entity';
import { LeaderboardModule } from './objects/leaderboard/leaderboard.module';
import { Comments } from './entities/comment.entity';
import { CommentsModule } from './objects/comment/comments.module';


@Module({
  imports: [
  ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
      type: 'mysql',

      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Account, Category, Question, Answer, Leaderboard, Comments],
      synchronize: true,
      // logger: 'simple-console',
      // logging: ['query'],
    }),
    AccountModule,
    CategoryModule,
    QuestionModule,
    AnswerModule,
    LeaderboardModule,
    CommentsModule,
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
