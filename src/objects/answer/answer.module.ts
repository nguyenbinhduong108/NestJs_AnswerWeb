import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { Answer } from 'src/entities/answer.entity';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { Question } from 'src/entities/question.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Answer, Question])],
    controllers: [AnswerController],
    providers: [AnswerService],
})
export class AnswerModule{}