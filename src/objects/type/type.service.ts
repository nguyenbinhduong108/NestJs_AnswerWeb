import { Repository } from 'typeorm';
import { HttpException, Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Type } from "src/entities/type.entity";
import { plainToInstance } from 'class-transformer';
import { TypeDto } from 'src/dto/type.dto';

@Injectable({
    scope: Scope.REQUEST,
})
export class TypeService {

    constructor(@InjectRepository(Type) private readonly typeRepository: Repository<Type>) { }

    /**
     * hàm lấy tất cả chủ đề các
     * @returns 
     */
    async getAll(): Promise<Type[]>{
        const result = await this.typeRepository.find();

        return plainToInstance(Type, result, {
            excludeExtraneousValues: true,
        })
    }

    async getOne(id: string): Promise<Type> { 
        const result = await this.typeRepository.findOneBy({id: id})

        if(result){
            return plainToInstance(Type, result, {
                excludeExtraneousValues: true,  
            })
        }
        else{
            throw new HttpException('Không tìm thấy chủ đề phù hợp', 500);
        }
    }
}