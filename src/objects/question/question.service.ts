import { HttpException, Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { QuestionDto } from "src/dto/question.dto";
import { Account } from "src/entities/account.entity";
import { Question } from "src/entities/question.entity";
import { Type } from "src/entities/type.entity";
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
        @InjectRepository(Type)
        private readonly typeRepository: Repository<Type>,
    ) { }



    async getAll() {
        try {
            const result = await this.questionRepository.find({
                relations: {
                    account: true,
                    type: true,
                },
                select: {
                    id: true,
                    name: true,
                    account: {
                        id: true,
                        username: true,
                    },
                    type: {
                        id: true,
                        name: true,
                        image: true,
                    },
                }
            });

            return result;
        } catch (error) {
            throw new HttpException("Lỗi serve", 500);
        }
    }

    async getOne(id: string){
        try {
            const result = await this.questionRepository.findOne({
                relations: {
                    account: true,
                    type: true,
                },
                select: {
                    id: true,
                    name: true,
                    account: {
                        username: true,
                    },
                    type: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
                where: {
                    id: id,
                }
            })


            return result;
        } catch (error) {
            throw new HttpException("Lỗi serve", 500);
        }
    }

    async create(questionDto: QuestionDto): Promise<Question> {
        try {
            const accountId = await this.accountRepository.findOneBy({id: questionDto.accountId});
            if(!accountId){
                throw new HttpException("Không tồn tại tài khoản", 400);
            }

            const typesId = await this.typeRepository.findOneBy({id: questionDto.typeId});
            if(!typesId){
                throw new HttpException("Không tồn tại chủ đề", 400);
            }

            const question = this.questionRepository.create({
                account: {id: questionDto.accountId},
                type: {id: questionDto.typeId},
                name: questionDto.name,
            });
            
            const result = await this.questionRepository.save(question);
            return result

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException("Lỗi serve", 500);
            }
        }
    }

    async update(id: string, questionDto: QuestionDto){
        try {
            const questionUpdate = await this.questionRepository.findOneBy({id:id});

            if(questionUpdate){
                const question = await this.questionRepository.create({
                    account: {id: questionDto.accountId},
                    type: {id: questionDto.typeId},
                    name: questionDto.name
                })

                const result = await this.questionRepository.update({id: id}, question);

                if(result.affected) return true;
                else return false;
            }

            else{
                throw new HttpException("Khônh tồn tại bộ câu hỏi cần cập nhật", 400)
            }
        } catch (error) {
            if(error instanceof HttpException){
                throw error;
            }
            else{
                throw new HttpException("Lỗi serve", 500);
            }
        }
    }

    async delete(id: string){
        try {
            const question =  await this.questionRepository.findOneBy({id: id});

            if(question){
                const result = await this.questionRepository.delete({id: id})

                if(result.affected){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                throw new HttpException("Không tìm thấy bộ câu hỏi cần xoá",400);
            }
        } catch (error) {
            if(error instanceof HttpException){
                throw error;
            } else {
                throw new HttpException("Lỗi serve", 500);
            }
        }
    }
}