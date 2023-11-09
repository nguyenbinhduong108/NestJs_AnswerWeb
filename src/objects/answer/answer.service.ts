import { HttpException, HttpStatus, Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Answer } from "src/entities/answer.entity";
import { Question } from "src/entities/question.entity";
import { Repository } from "typeorm";

@Injectable({
    scope: Scope.REQUEST,
})
export class AnswerService {

    constructor(
        @InjectRepository(Answer) private readonly answerRepository: Repository<Answer>,
        @InjectRepository(Question) private readonly questionRepository: Repository<Question>,
    ) { }


    async getAllByQuestionId(id: string) {
        try {
            const questionId = await this.questionRepository.findOneBy({id: id});

            if(questionId){
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
                        question: {id: id},
                    }
                })

                return result;
            }
            else{
                throw new HttpException("Không tồn tại bộ câu hỏi cần tìm", 404);
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

    async getOneById(id: string){
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

            if(result){
                return result;
            }
            else{
                throw new HttpException("Không tìm thấy câu hỏi", 404);
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