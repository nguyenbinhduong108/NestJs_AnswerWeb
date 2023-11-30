import { Repository } from 'typeorm';
import { HttpException, Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/category.entity";

@Injectable({
    scope: Scope.REQUEST,
})
export class CategoryService {

    constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) { }

    /**
     * Hàm lấy tất cả category
     * @returns danh sách category 
     * 
     * B1: Tìm kiếm category
     *  - Nếu không tìm thấy thì throw
     *  - Nếu tìm thấy sang B2
     * B2: Trả về danh sách category
     */
    async getAll(): Promise<Category[]> {
        try {
            const result = await this.categoryRepository.find();
            
            if(result.length !==0){
                return result;
            }
            else{
                throw new HttpException("Không tồn tại chủ đề", 404);
            }

            
        } catch (error) {
            throw new HttpException("Lỗi server", 500);
        }
    }

    /**
     * Hàm lấy 1 category
     * @param categoryId: id của category cần tìm
     * @returns category cần tìm
     * 
     * B1: Tìm kiếm id category
     *  - Nếu không tìm thấy thì throw
     *  - Nếu tìm thấy sang B2
     * B2: Trả về category cần tìm 
     */
    async getOne(categoryId: string): Promise<Category> {
        try {
            const result = await this.categoryRepository.findOneBy({ id: categoryId })

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