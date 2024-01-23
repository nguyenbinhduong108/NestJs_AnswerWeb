import { Module } from "@nestjs/common";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comments } from "src/entities/comment.entity";
import { QuestionModule } from "../question/question.module";
import { AccountModule } from "../account/account.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Comments]),
        QuestionModule,
        AccountModule,
    ],
    controllers: [CommentsController],
    providers: [CommentsService],
})
export class CommentsModule{}