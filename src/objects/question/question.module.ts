import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "src/entities/question.entity";
import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";
import { Account } from "src/entities/account.entity";
import { Type } from "src/entities/type.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Question, Account, Type])],
    controllers: [QuestionController],
    providers: [QuestionService],
})
export class QuestionModule{}