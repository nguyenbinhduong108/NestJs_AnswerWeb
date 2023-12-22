import { HttpException, Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { QuestionDto } from "src/dto/question.dto";
import { Account } from "src/entities/account.entity";
import { Category } from "src/entities/category.entity";
import { Question } from "src/entities/question.entity";
import { Like, Repository } from "typeorm";

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
     * Hàm lấy tất các question
     * @returns danh sách question
     * 
     * B1: Tìm kiếm question trong db
     *  - Nếu không tìm thấy thì throw
     *  - Nếu tìm thấy thì sang B2
     * B2: Trả về danh sách question
     */
    async getAll(limit: number, offset: number, search: string): Promise<{}> {
        try {

            const all = await this.questionRepository.count();

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
                    quantity: true,
                    createdAt: true,
                    updatedAt: true,
                    deletedAt: true,
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
                    name: Like(`%${search}%`)
                },
                take: limit,
                skip: offset,
            });

            return {
                total: Math.ceil(all/limit),
                data: result,
            };


        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException("Lỗi server", 500);
            }
        }
    }

    /**
     * Hàm lấy question theo 1 admin account
     * @param accountId: id của admin account
     * @returns danh sách question
     * 
     * B1: Tìm kiếm question trong db
     *  - Nếu không tìm thấy thì throw
     *  - Nếu tìm thấy sang B2
     * B2: Trả về danh sách question
     */
    async getAllQuestionByAccountId(accountId: string, limit: number, offset: number, search: string): Promise<{}> {
        try {
            const all = await this.questionRepository.countBy({
                account:{
                    id: accountId,
                }
            })

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
                    quantity: true,
                    createdAt: true,
                    updatedAt: true,
                    deletedAt: true,
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
                        id: accountId
                    },
                    name: Like(`%${search}%`)
                },
                take: limit,
                skip: offset,
            });

            return {
                total: Math.ceil(all/limit),
                data: result,
            };

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException("Lỗi server", 500);
            }
        }
    }

    /**
     * Hàm ấy tất cả question theo id category (người chơi sử dụng tính năng lọc)
     * @param categoryId 
     * @returns danh sách question
     * 
     * B1: Tìm kiếm question trong db
     *  - Nếu không tìm thấy thì throw
     *  - Nếu tìm thấy sang B2
     * B2: Trả về danh sách question
     */
    async getAllQuestionByCategoryId(categoryId: string, limit: number, offset: number, search: string): Promise<{}> {
        try {
            const all = await this.questionRepository.countBy({
                category: {
                    id: categoryId,
                }
            })

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
                    quantity: true,
                    createdAt: true,
                    updatedAt: true,
                    deletedAt: true,
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
                        id: categoryId
                    },
                    name: Like(`%${search}%`)
                },
                take: limit,
                skip: offset,
            });

            return {
                total: Math.ceil(all/limit),
                data: result,
            };

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException("Lỗi server", 500);
            }
        }
    }

    /**
     * Hàm lấy 1 question
     * @param questionId: id của question cần tìm
     * @returns question
     * 
     * B1: Tìm kiếm question trong db
     *  - Nếu không tìm thấy thì throw
     *  - Nếu tìm thấy sang B2
     * B2: Trả về question
     */
    async getOneQuestionByQuestionId(questionId: string): Promise<Question> {
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
                    quantity: true,
                    createdAt: true,
                    updatedAt: true,
                    deletedAt: true,
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
                    id: questionId,
                }
            })

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
     * tạo 1 question
     * @param questionDto: thông tin question
     * @returns question 
     * 
     * B1: Validate dữ liệu
     *  - Image: Nếu ảnh không hợp lệ thì sử dụng ảnh mặc định
     *  - AccountId: Nếu AccountId không tồn tại thì throw
     *  - CategoriesId: Nếu CategoriesId không tồn tại thì throw
     * B2: Tạo object 
     * B3: Thêm object vào db
     *  - Nếu thêm thất bại thì throw
     *  - Nếu thêm thành công sang B4
     * B4: Trả về question
     */
    async createQuestion(questionDto: QuestionDto): Promise<Question> {
        try {
            if (questionDto.image === null || questionDto.image === undefined || questionDto.image === "") {
                questionDto.image = "https://i.imgur.com/Ekd3MLm.jpg"
            }

            const accountId = await this.accountRepository.findOneBy({ id: questionDto.accountId });
            if (!accountId) {
                throw new HttpException("Không tồn tại tài khoản", 400);
            }

            const categoriesId = await this.categoryRepository.findOneBy({ id: questionDto.categoryId });
            if (!categoriesId) {
                throw new HttpException("Không tồn tại chủ đề", 400);
            }

            const question = this.questionRepository.create({
                ...questionDto,
                account: { id: questionDto.accountId },
                category: { id: questionDto.categoryId },
            });

            const result = await this.questionRepository.save(question);

            if (result) {
                return this.getOneQuestionByQuestionId(result.id);
            }
            else {
                throw new HttpException("Thêm bộ câu hỏi không thành công", 500);
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
     * cập nhật 1 question
     * @param questionId: id của question cần thêm
     * @param questionDto: thông tin question
     * @returns question
     * 
     * B1: Kiểm tra question có tồn tại không
     *  - Nếu không tìm thấy thì throw
     *  - Nếu tìm thấy thì sang B2
     * B2: Tạo objcet 
     * B3: Cập nhật objcet vào db
     *  - Nếu cập nhật không thành công thì throw
     *  - Nếu cập nhật thành công sang B4
     * B4: Trả về question
     */
    async updateQuestion(questionId: string, questionDto: QuestionDto): Promise<Question> {
        try {
            const questionUpdate = await this.questionRepository.findOneBy({ id: questionId });

            if (questionUpdate) {
                const question = await this.questionRepository.create({
                    account: { id: questionDto.accountId },
                    category: { id: questionDto.categoryId },
                    updatedAt: Date.now(),
                    turn: questionUpdate.turn,
                    quantity: questionUpdate.quantity,
                    ...questionDto
                })

                const result = await this.questionRepository.update({ id: questionId }, question);

                if (result.affected) {
                    return this.getOneQuestionByQuestionId(questionId);
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
     * xoá 1 question
     * @param questionId: id của question cần xoá
     * @returns true
     * 
     * B1: Tìm kiếm question cần xoá
     *  - Nếu không tìm thấy thì throw
     *  - Nếu tìm thấy thì sang B2
     * B2: Xoá question
     *  - Nếu xoá không thành công thì throw
     *  - Nếu xoá thành công sang B3
     * B3: Trả về true
     */
    async deleteQuestion(questionId: string): Promise<Boolean> {
        try {
            const question = await this.questionRepository.findOneBy({ id: questionId });

            if (question) {
                const result = await this.questionRepository.delete({ id: questionId });

                if (result.affected) {
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
     * cập nhật lại tổng số lượt chơi
     * @param id 
     */
    async updateTurnOfQuestion(id: string): Promise<void> {
        try {
            const result = await this.questionRepository.findOneBy({ id: id });

            result.turn++;

            await this.questionRepository.update({ id: id }, { turn: result.turn });
        } catch (error) {
            throw new HttpException("Lỗi cập nhật tổng số lượt chơi", 500);
        }

    }

    /**
     * cập nhật lại tổng số câu hỏi khi thêm câu hỏi
     * @param id 
     */
    async updateAddQuantityOfQuestion(id: string): Promise<void> {
        try {
            const result = await this.questionRepository.findOneBy({ id: id });

            result.quantity++;

            await this.questionRepository.update({ id: id }, { quantity: result.quantity });
        } catch (error) {
            throw new HttpException("Lỗi cập nhật tổng số câu hỏi", 500);
        }
    }

    /**
     * cập nhật lại tổng số câu hỏi khi xoá câu hỏi
     * @param id 
     */
    async updateMinusQuantityOfQuestion(id: string): Promise<void> {
        try {
            const result = await this.questionRepository.findOneBy({ id: id });
            result.quantity--;
            await this.questionRepository.update({ id: id }, { quantity: result.quantity });
        } catch (error) {
            throw new HttpException("Lỗi cập nhật tổng số câu hỏi", 500);
        }
    }
}