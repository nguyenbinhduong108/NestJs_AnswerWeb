import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "src/entities/question.entity";
import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";
import { Account } from "src/entities/account.entity";
import { Category } from "src/entities/category.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Question, Account, Category])],
    controllers: [QuestionController],
    providers: [QuestionService],
    exports: [QuestionService],
})
export class QuestionModule{}