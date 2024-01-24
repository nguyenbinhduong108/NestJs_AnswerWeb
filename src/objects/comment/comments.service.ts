import { HttpException, Inject, Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentDto } from "src/dto/comment.dto";
import { Comments } from "src/entities/comment.entity";
import { Repository } from "typeorm";
import { QuestionService } from "../question/question.service";
import { skip } from "node:test";
import { AccountService } from "../account/account.service";

@Injectable({
    scope: Scope.REQUEST,
})
export class CommentsService {
    constructor(
        @InjectRepository(Comments) private readonly commentsRepository: Repository<Comments>,
        @Inject(QuestionService) private readonly questionService: QuestionService,
        @Inject(AccountService) private readonly accountService: AccountService,
    ) { }

    async getComments(questionId: string, page: number) {
        try {
            const question = await this.questionService.getOneQuestionByQuestionId(questionId);


            if (question) {
                const result = await this.commentsRepository.find({
                    relations: {
                        account: true,
                        question: true,
                    },
                    select: {
                        id: true,
                        comment: true,
                        rating: true,
                        account: {
                            username: true,
                            avatar: true,
                        }
                    },
                    where: {
                        question: {
                            id: questionId
                        }
                    },
                    take: 10,
                    skip: (page-1) * 10,
                });

                return result;
            } else {
                throw new HttpException('Không tìm thấy bộ câu hỏi', 404);
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            else {
                throw new HttpException("Lỗi server", 500);
            }
        }
    }

    async createComments(commentsDto: CommentDto) {
        try {
            const question = await this.questionService.getOneQuestionByQuestionId(commentsDto.questionId);

            if (!question) {
                throw new HttpException('Không tìm thấy bộ câu hỏi', 404);
            }

            const account = await this.accountService.getOne(commentsDto.accountId);

            if (!account) {
                throw new HttpException('Không tìm thấy tài khoản', 404);
            }

            const comment = await this.commentsRepository.create({
                ...commentsDto,
                account: {
                    id: commentsDto.accountId
                },
                question: {
                    id: commentsDto.questionId
                }
            })

            const result = await this.commentsRepository.save(comment);

            if (result) {
                return result;
            } else {
                throw new HttpException('Thêm bình luận không thành công', 500)
            }

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            else {
                throw new HttpException("Lỗi server", 500);
            }
        }
    }

    async updateComments(id: string, commentsDto: CommentDto) {
        try {
            const question = await this.questionService.getOneQuestionByQuestionId(commentsDto.questionId);

            if (question) {
                throw new HttpException('Không tìm thấy bộ câu hỏi', 404);
            }

            const account = await this.accountService.getOne(commentsDto.accountId);

            if (account) {
                throw new HttpException('Không tìm thấy tài khoản', 404);
            }

            const commentUpdate = await this.commentsRepository.findOneBy({
                id: id,
            })

            if (commentUpdate) {

                const result = await this.commentsRepository.update({ id: commentsDto.questionId }, {
                    comment: commentsDto.comment,
                    rating: commentsDto.rating,
                })

                if (result) {
                    return result;
                } else {
                    throw new HttpException('Sửa bình luậ không thành công', 500)
                }

            } else {
                throw new HttpException("Không tìm thấy bình luận cần sửa", 404);
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            else {
                throw new HttpException("Lỗi server", 500);
            }
        }
    }

    async deleteComments(id: string) {
        try {
            const commentDelete = await this.commentsRepository.findOneBy({id: id});

            if(!commentDelete){
                throw new HttpException("Không tìm thấy bình luận cần xoá", 404);
            }

            const result = await this.commentsRepository.delete({id: id});
            if(result){
                return true;
            }else{
                throw new HttpException('Xoá bình luận không thành công', 500);
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