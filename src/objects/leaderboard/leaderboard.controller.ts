import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LeaderboardService } from "./leaderboard.service";
import { LeaderboardDto } from "src/dto/leaderboard.dto";

@Controller('leaderboard')
@ApiTags("Leaderboard")
export class LeaderboardController{

    constructor(private readonly leaderboardService: LeaderboardService) { }

    @Get()
    async getLeaderboard(@Res() res, @Query('questionId') questionId: string, @Query('top') top: number ){
        const result = await this.leaderboardService.getLeaderboard(questionId, top);

        return res.status(HttpStatus.OK).json(result);
    }

    @Post()
    async createLeaderboard(@Res() res, @Body() leaderboardDto: LeaderboardDto){
        const result = await this.leaderboardService.createLeaderboard(leaderboardDto);

        return res.status(HttpStatus.OK).json(result);
    }

    @Delete()
    async deleteLeaderboard(@Res() res, @Param('accountId') accountId: string){
        const result = await this.leaderboardService.deleteLeaderboard(accountId);

        return res.status(HttpStatus.OK).json(result);
    }
}