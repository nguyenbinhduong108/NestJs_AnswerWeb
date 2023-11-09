import { Repository } from 'typeorm';
import { HttpException, Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/category.entity";
import { plainToInstance } from 'class-transformer';

@Injectable({
    scope: Scope.REQUEST,
})
export class CategoryService {

    constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) { }

    /**
     * hàm lấy tất cả chủ đề các
     * @returns 
     */
    async getAll(): Promise<Category[]>{
        const result = await this.categoryRepository.find();

        return plainToInstance(Category, result, {
            excludeExtraneousValues: true,
        })
    }

    async getOne(id: string): Promise<Category> { 
        const result = await this.categoryRepository.findOneBy({id: id})

        if(result){
            return plainToInstance(Category, result, {
                excludeExtraneousValues: true,  
            })
        }
        else{
            throw new HttpException('Không tìm thấy chủ đề phù hợp', 500);
        }
    }
}