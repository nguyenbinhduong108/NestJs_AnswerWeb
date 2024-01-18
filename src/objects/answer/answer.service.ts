import { HttpException, Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerDto } from 'src/dto/answer.dto';
import { Answer } from 'src/entities/answer.entity';
import { Question } from 'src/entities/question.entity';
import { Repository } from 'typeorm';
import { QuestionService } from '../question/question.service';

@Injectable({
    scope: Scope.REQUEST,
})
export class AnswerService {
    constructor(
        @InjectRepository(Answer)
        private readonly answerRepository: Repository<Answer>,
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,
        @Inject(QuestionService) private readonly questionService: QuestionService,
    ) { }

    /**
     * lấy ra tất cả các answer theo id của question
     * @param id: id của question lấy
     * @returns danh sách answer của question
     *
     * B1: Kiểm tra question có tồn tại không
     *  - Nếu không tìm thấy thì throw
     *  - Nếu tìm thấy sang B2
     * B2: Select ra các answer cần tìm
     * B3: Cập nhật lại turn cảu question (số lượt chơi)
     * B4: Trả về danh sách answer của question cần tìm
     */
    async getAllAnswerByQuestionId(questionId: string): Promise<Answer[]> {
        try {
            const questions = await this.questionRepository.findOneBy({
                id: questionId,
            });

            if (questions) {
                const result = await this.answerRepository.find({
                    relations: {
                        question: true,
                    },
                    select: {
                        id: true,
                        title: true,
                        image: true,
                        answers: true,
                        trueAnswer: true,
                        question: {
                            id: true,
                            name: true,
                        },
                    },
                    where: {
                        question: { id: questionId },
                    },
                });

                this.questionService.updateTurnOfQuestion(questionId);

                return result;
            } else {
                throw new HttpException('Không tồn tại question cần tìm', 404);
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException('Lỗi server', 500);
            }
        }
    }

    /**
     * Hàm lấy 1 answer
     * @param answerId: id của answer cần tìm
     * @returns answer cần tìm
     *
     * B1: Tìm kiếm answer
     *  - Nếu không có throw
     *  - Nếu có trả về answer
     */
    async getOneById(answerId: string): Promise<Answer> {
        try {
            const result = await this.answerRepository.findOne({
                relations: {
                    question: true,
                },
                select: {
                    id: true,
                    title: true,
                    image: true,
                    answers: true,
                    trueAnswer: true,
                    question: {
                        id: true,
                        name: true,
                    },
                },
                where: {
                    id: answerId,
                },
            });

            return result;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException('Lỗi server', 500);
            }
        }
    }

    /**
     * hàm thêm answer cho 1 question
     * @param questionId: id của question
     * @param answerDto: thông tin answer
     * @returns answer vừa thêm
     *
     * B1: Kiểm tra có tồn tại question KHÔNG
     *  - Nếu không tìm thấy throw
     *  - Nếu tìm thấy sang B2
     * B2: Validate dữ liệu
     *  - Image: Nếu ảnh không hợp lệ thì sử dụng ảnh mặc định
     * B3: Tạo ra obejct để thâm vào DB
     * B4: Lưu object vào DB
     * B5: Cập nhật lại quantity của question
     * B6: Trả về answer của thêm
     */
    async creatAnswerByQuestionId(questionId: string, answerDto: AnswerDto[]): Promise<Answer[]> {
        try {
            const question = await this.questionRepository.findOneBy({
                id: questionId,
            });

            if (question) {
                answerDto.forEach(async (answer) => {
                    if (
                        answer.image === null ||
                        answer.image === undefined ||
                        answer.image === ''
                    ) {
                        answer.image = 'https://i.imgur.com/oJN9YcQ.jpg';
                    }

                    const answerElement = await this.answerRepository.create({
                        ...answer,
                        question: { id: questionId },
                    });

                    await this.answerRepository.save(answerElement);
                });
                await this.questionService.updateAddQuantityOfQuestion(questionId, answerDto.length);
                
                return  this.getAllAnswerByQuestionId(questionId);

            } else {
                throw new HttpException('Không tồn tại question cần tìm', 404);
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException('Lỗi server', 500);
            }
        }
    }

    /**
     * Hàm cập nhật 1 answer
     * @param id: id của answer cần cập nhật
     * @param answerDto: thông tin của answer
     * @returns answer vừa được cập nhật
     *
     * B1: Tìm kiếm answer cần cập nhật
     *  - Nếu không tìm thấy throw
     *  - Nếu tìm thấy sang B2
     * B2: Validate dữ liệu
     *  - Image: Nếu ảnh không hợp lệ thì sử dụng ảnh mặc định
     * B3: Cập nhật lại answer
     *  - Nếu cập nhật không thành công thì throw
     *  - Nếu cập nhật thành công sang B4
     * B4: Trả về answer
     */
    async updateAnswerById(
        answerId: string,
        answerDto: AnswerDto,
    ): Promise<Answer> {
        try {
            const updateAnswer = await this.answerRepository.findOneBy({
                id: answerId,
            });

            if (updateAnswer) {
                if (
                    answerDto.image === null ||
                    answerDto.image === undefined ||
                    answerDto.image === ''
                ) {
                    answerDto.image = 'https://i.imgur.com/oJN9YcQ.jpg';
                }

                const result = await this.answerRepository.update(
                    { id: answerId },
                    answerDto,
                );

                if (result.affected) {
                    return this.getOneById(answerId);
                } else {
                    throw new HttpException('Cập nhật không thành công', 500);
                }
            } else {
                throw new HttpException('Không tìm thấy câu hỏi cần cập nhật', 404);
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException('Lỗi server', 500);
            }
        }
    }

    /**
     * Hàm xoá answer
     * @param answerId: id answer cần xoá
     * @returns true
     *
     * B1: Tìm kiếm answer cần xoá
     *  - Nếu không tìm thấy throw
     *  - Nếu tìm thấy sang B2
     * B2: Xoá answer
     *  - Nếu xoá không thành công thì throw
     *  - Nếu xoá thành công sang B3
     * B3: Lấy id của question chứa answer đó
     * B4: Cập nhật lại quantity của question
     * B5: Trả về true
     */
    async deleteAnswerById(answerId: string): Promise<Boolean> {
        try {
            const deleteAnswer = await this.answerRepository.findOneBy({
                id: answerId,
            });

            if (deleteAnswer) {
                const questionId = await this.getOneById(answerId);
                await this.questionService.updateMinusQuantityOfQuestion(
                    questionId.question.id,
                );
                const result = await this.answerRepository.delete({ id: answerId });

                if (result.affected) {
                    return true;
                } else {
                    throw new HttpException('Xoá không thành công', 500);
                }
            } else {
                throw new HttpException('Không tìm thấy câu hỏi cần xoá', 404);
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException('Lỗi server', 500);
            }
        }
    }
}
