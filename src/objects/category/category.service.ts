import { Repository } from 'typeorm';
import { HttpException, Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/category.entity";
import { plainToInstance } from 'class-transformer';
import { CategoryDto } from 'src/dto/category.dto';

@Injectable({
    scope: Scope.REQUEST,
})
export class CategoryService {

    constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) { }

    /**
     * hàm lấy tất cả chủ đề các
     * @returns 
     */
    async getAll(): Promise<Category[]> {
        try {
            const result = await this.categoryRepository.find();

            return result;
        } catch (error) {
            throw new HttpException("Lỗi server", 500);
        }
    }

    async getOne(id: string): Promise<Category> {
        try {
            const result = await this.categoryRepository.findOneBy({ id: id })

            if (result) {
                return result;
            }
            else {
                throw new HttpException('Không tìm thấy chủ đề phù hợp', 404);
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