import { HttpException, Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AnswerDto } from "src/dto/answer.dto";
import { Answer } from "src/entities/answer.entity";
import { Question } from "src/entities/question.entity";
import { Repository } from "typeorm";
import { QuestionService } from "../question/question.service";

@Injectable({
    scope: Scope.REQUEST,
})
export class AnswerService {

    constructor(
        @InjectRepository(Answer) private readonly answerRepository: Repository<Answer>,
        @InjectRepository(Question) private readonly questionRepository: Repository<Question>,
        private readonly questionService: QuestionService,
    ) { }

    /**
     * lấy ra tất cả các câu hỏi theo id của bộ câu hỏi
     * @param id: id của bộ câu hỏi
     * @returns 
     */
    async getAllAnswerByQuestionId(id: string) {
        try {
            const questionId = await this.questionRepository.findOneBy({ id: id });

            if (questionId) {
                const result = await this.answerRepository.find({
                    relations: {
                        question: true,
                    },
                    select: {
                        id: true,
                        title: true,
                        image: true,
                        answerA: true,
                        answerB: true,
                        answerC: true,
                        answerD: true,
                        trueAnswer: true,
                        question: {
                            id: true,
                            name: true,
                        }
                    },
                    where: {
                        question: { id: id },
                    }
                })

                this.questionService.updateTurnOfQuestion(id);

                return result;
            }
            else {
                throw new HttpException("Không tồn tại bộ câu hỏi cần tìm", 404);
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

    async getOneById(id: string) {
        try {
            const result = await this.answerRepository.findOne({
                relations: {
                    question: true,
                },
                select: {
                    id: true,
                    title: true,
                    image: true,
                    answerA: true,
                    answerB: true,
                    answerC: true,
                    answerD: true,
                    trueAnswer: true,
                    question: {
                        id: true,
                        name: true,
                    }
                },
                where: {
                    id: id,
                }
            })

            if (result) {
                return result;
            }
            else {
                throw new HttpException("Không tìm thấy câu hỏi", 404);
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

    async creatAnswerByQuestionId(questionId: string, answerDto: AnswerDto) {
        try {
            const question = await this.questionRepository.findOneBy({ id: questionId });

            if (question) {

                if(answerDto.image === null || answerDto.image === undefined || answerDto.image === ""){
                    answerDto.image = "https://i.imgur.com/oJN9YcQ.jpg";
                }

                const answer = await this.answerRepository.create({
                    ...answerDto,
                    question: { id: questionId }
                })

                const result = await this.answerRepository.save(answer);

                this.questionService.updateQuantityOfQuestion(questionId);

                return result;
            }
            else {
                throw new HttpException("Không tồn tại bộ câu hỏi cần tìm", 404);
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

    async updateAnswerById(id: string, answerDto: AnswerDto){
        try {
            const updateAnswer = await this.answerRepository.findOneBy({id: id});

            if(updateAnswer){

                if(answerDto.image === null || answerDto.image === undefined || answerDto.image === ""){
                    answerDto.image = "https://i.imgur.com/oJN9YcQ.jpg";
                }

                const result = await this.answerRepository.update({id: id}, answerDto);

                if(result.affected){
                    return result;
                }

                else{
                    return false;
                }
            }

            else{
                throw new HttpException("Không tìm thấy câu hỏi cần cập nhật", 404);
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

    async deleteAnswerById(id: string) {
        try {
            const deleteAnswer = await this.answerRepository.findOneBy({ id: id });

            if (deleteAnswer) {
                const result = await this.answerRepository.delete({ id: id });

                if (result.affected) {
                    return true;
                }
                else {
                    return false
                }
            }

            else {
                throw new HttpException("Không tìm thấy câu hỏi cần xoá", 404);
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
}