import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { type } from 'os';

export class QuestionDto{
    id: string;

    @IsString({message: "Tên bộ câu hỏi không hợp lệ"})
    @IsNotEmpty({message: "Bộ câu hỏi không được để trống"})
    @ApiProperty({type: String})
    name: string;

    @IsOptional()
    @ApiProperty({type: String, default: "https://i.imgur.com/Ekd3MLm.jpg"})
    image: string;

    @IsString({message: "Tài khoản không hợp lệ"})
    @IsNotEmpty({message: "Tài khoảng không được để trống"})
    @ApiProperty({type: String})
    accountId: string;

    @IsString({message: "Chủ đề không hợp lệ"})
    @IsNotEmpty({message: "Chủ đề không được để trống"})
    @ApiProperty({type: String, default: "c528aa85-6f65-4794-91c9-fe6102b94c12"})
    categoryId: string;
}