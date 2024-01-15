import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Leaderboard } from "src/entities/leaderboard.entity";
import { LeaderboardController } from "./leaderboard.controller";
import { LeaderboardService } from "./leaderboard.service";
import { QuestionModule } from "../question/question.module";
import { AccountModule } from "../account/account.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Leaderboard]),
        QuestionModule,
        AccountModule
    ],
    controllers: [LeaderboardController],
    providers: [LeaderboardService],
})
export class LeaderboardModule{}