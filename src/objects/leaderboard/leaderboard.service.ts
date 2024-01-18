import { HttpException, Inject, Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LeaderboardDto } from "src/dto/leaderboard.dto";
import { Leaderboard } from "src/entities/leaderboard.entity";
import { Repository } from "typeorm";
import { QuestionService } from "../question/question.service";
import { AccountService } from "../account/account.service";

@Injectable({
    scope: Scope.REQUEST
})
export class LeaderboardService{

    constructor(
        @InjectRepository(Leaderboard) private readonly leaderboardRepository: Repository<Leaderboard>,
        @Inject(QuestionService) private readonly questionService: QuestionService,
        @Inject(AccountService) private readonly accountService: AccountService
    ){}

    async getLeaderboard(questionId: string){
        try {
            const result = await this.leaderboardRepository.find({
                relations: {
                    account: true,
                },
                select: {
                    id: true,
                    result: true,
                    timer: true,
                    account: {
                        avatar: true,
                        username: true,
                    }
                },
                where: {
                    question: {
                        id: questionId,
                    }
                },
                take: 3,
                skip: 0,
                order:{
                    result: "DESC",
                    timer: "ASC"
                }
            })

            if(result){
                return result
            }
            else{
                throw new HttpException('Không tim thấy bảng xếp hạng', 404);
            }
        } catch (error) {
            if(error instanceof HttpException){
                throw error;
            }
            else{
                throw new HttpException("Lỗi server", 500);
            }
        }
    }

    async createLeaderboard(leaderboardDto: LeaderboardDto){
        try {
            const question = await this.questionService.getOneQuestionByQuestionId(leaderboardDto.questionId);
            if(question === null){
                throw new HttpException('Không tìm thấy bộ câu hỏi', 404);
            }

            const account = await this.accountService.getOne(leaderboardDto.accountId);
            if(account === null){
                throw new HttpException('Không tìm thấy người dùng', 404);
            }

            const leaderboard = this.leaderboardRepository.create({
                ...leaderboardDto,
                account: {id: leaderboardDto.accountId},
                question: {id : leaderboardDto.questionId},
            })

            const result = this.leaderboardRepository.save(leaderboard);

            if(result){
                return result;
            }else{
                throw new HttpException('Thêm bảng xếp hạng không thành công', 500);
            }

        } catch (error) {
            if(error instanceof HttpException){
                throw error;
            }
            else{
                throw new HttpException("Lỗi server", 500);
            }
        }
    }

    async deleteLeaderboard(accountId: string){
        try {
            const account = await this.accountService.getOne(accountId);
            if(account === null){
                throw new HttpException('Không tìm thấy người dùng', 404);
            }

            const data = await this.leaderboardRepository.findBy({
                account: {id: accountId}
            })

            if(data){
                const result = await this.leaderboardRepository.delete({
                    account: {id: accountId}
                })

                if(result){
                    return true;
                }else{
                    throw new HttpException('Xoá bảng xếp hạng không thành công', 500);
                }

            }else{
                throw new HttpException("Không tìm thấy bảng xếp hạng", 404);
            }
        } catch (error) {
            if(error instanceof HttpException){
                throw error;
            }
            else{
                throw new HttpException("Lỗi server", 500);
            }
        }
    }
}