import { HttpException, Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QuestionDto } from "src/dto/question.dto";
import { Account } from "src/entities/account.entity";
import { Category } from "src/entities/category.entity";
import { Question } from "src/entities/question.entity";
import { Repository } from "typeorm";

@Injectable({
    scope: Scope.REQUEST,
})
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }

    /**
     * lấy tất các bộ câu hỏi
     * @returns 
     */
    async getAll(): Promise<Question[]> {
        try {
            const result = await this.questionRepository.find({
                relations: {
                    account: true,
                    category: true,
                },
                select: {
                    id: true,
                    name: true,
                    image: true,
                    timer: true,
                    turn: true,
                    account: {
                        id: true,
                        username: true,
                    },
                    category: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            });

            if (result.length !== 0) {
                return result;
            } else {
                throw new HttpException("Không có bộ câu hỏi nào", 404);
            }

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException("Lỗi server", 500);
            }
        }
    }

    /**
     * lấy tất cả các bộ câu hỏi của 1 admin
     * @param id 
     * @returns 
     */
    async getAllQuestionByAccountId(id: string): Promise<Question[]> {
        try {
            const result = await this.questionRepository.find({
                relations: {
                    account: true,
                    category: true,
                },
                select: {
                    id: true,
                    name: true,
                    image: true,
                    timer: true,
                    turn: true,
                    account: {
                        id: true,
                        username: true,
                    },
                    category: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
                where: {
                    account: {
                        id: id
                    }
                }
            });

            if (result.length !== 0) {
                return result;
            } else {
                throw new HttpException("Không có bộ câu hỏi nào", 404)
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException("Lỗi server", 500);
            }
        }
    }

    /**
     * lấy tất cả bộ câu hỏi theo chủ đề (người chơi sử dụng tính năng lọc)
     * @param id 
     * @returns 
     */
    async getAllQuestionByCategoryId(id: string): Promise<Question[]> {
        try {
            const result = await this.questionRepository.find({
                relations: {
                    account: true,
                    category: true,
                },
                select: {
                    id: true,
                    name: true,
                    image: true,
                    timer: true,
                    turn: true,
                    account: {
                        id: true,
                        username: true,
                    },
                    category: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
                where: {
                    category: {
                        id: id
                    }
                }
            });

            if (result.length !== 0) {
                return result;
            } else {
                throw new HttpException("Không có bộ câu hỏi nào", 404)
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException("Lỗi server", 500);
            }
        }
    }

    /**
     * lấy 1 bộ câu hỏi
     * @param id 
     * @returns 
     */
    async getOne(id: string): Promise<Question> {
        try {
            const result = await this.questionRepository.findOne({
                relations: {
                    account: true,
                    category: true,
                },
                select: {
                    id: true,
                    name: true,
                    image: true,
                    timer: true,
                    turn: true,
                    account: {
                        username: true,
                    },
                    category: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
                where: {
                    id: id,
                }
            })

            if (result !== null) {
                return result;
            } else {
                throw new HttpException("Không có bộ câu hỏi nào", 404)
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException("Lỗi server", 500);

            }
        }
    }

    /**
     * tạo 1 bộ câu hỏi
     * @param questionDto 
     * @returns 
     */
    async create(questionDto: QuestionDto): Promise<Question> {
        try {
            if (questionDto.image === null || questionDto.image === undefined || questionDto.image === "") {
                questionDto.image = "https://i.imgur.com/Ekd3MLm.jpg"
            }

            const accountId = await this.accountRepository.findOneBy({ id: questionDto.accountId });
            if (!accountId) {
                throw new HttpException("Không tồn tại tài khoản", 400);
            }

            const categorysId = await this.categoryRepository.findOneBy({ id: questionDto.categoryId });
            if (!categorysId) {
                throw new HttpException("Không tồn tại chủ đề", 400);
            }

            const question = this.questionRepository.create({
                account: { id: questionDto.accountId },
                category: { id: questionDto.categoryId },
                ...questionDto
            });

            const result = await this.questionRepository.save(question);

            return result;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException("Lỗi server", 500);
            }
        }
    }

    /**
     * cập nhật 1 bộ câu hỏi
     * @param id 
     * @param questionDto 
     * @returns 
     */
    async update(id: string, questionDto: QuestionDto): Promise<Boolean> {
        try {
            const questionUpdate = await this.questionRepository.findOneBy({ id: id });

            if (questionUpdate) {
                const question = await this.questionRepository.create({
                    account: { id: questionDto.accountId },
                    category: { id: questionDto.categoryId },
                    ...questionDto
                })

                const result = await this.questionRepository.update({ id: id }, question);

                if (result.affected !== 0) {
                    return true;
                }
                else {
                    throw new HttpException("Cập nhật bộ câu hỏi không thành công", 500);
                }
            } else {
                throw new HttpException("Không tồn tại bộ câu hỏi cần cập nhật", 400)
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException("Lỗi server", 500);
            }
        }
    }

    /**
     * xoá 1 bộ câu hỏi
     * @param id 
     * @returns 
     */
    async delete(id: string): Promise<Boolean> {
        try {
            const question = await this.questionRepository.findOneBy({ id: id });

            if (question) {
                const result = await this.questionRepository.delete({ id: id })

                if (result.affected !== 0) {
                    return true;
                }
                else {
                    throw new HttpException("Xoá không thành công", 500);
                }
            } else {
                throw new HttpException("Không tìm thấy bộ câu hỏi cần xoá", 400);
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException("Lỗi server", 500);
            }
        }
    }

    /**
     * cập nhật lại số lượt chơi
     * @param id 
     */
    async updateTurnOfQuestion(id: string): Promise<void> {
        try {
            const result = await this.questionRepository.findOneBy({ id: id });

            result.turn++

            await this.questionRepository.update({ id: id }, { turn: result.turn });
        } catch (error) {
            throw new HttpException("Lỗi server", 500);
        }

    }
}