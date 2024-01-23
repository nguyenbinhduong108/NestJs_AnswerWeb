import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CommentDto{
    id: string;

    @IsNotEmpty({message: 'Bình luận không được để trống'})
    @IsString({message: 'Bình luận phải là một chuỗi'})
    @ApiProperty({type: String})
    comment: string;

    @IsOptional()
    @IsNumber({}, {message: 'Đánh giá phải là một số'})
    @ApiProperty({type: Number})
    rating: number;

    @IsNotEmpty({message: 'Mã tài khoản không được để trống'})
    @IsString({message: 'Mã tài khoản phải là một chuỗi'})
    @ApiProperty({type: String})
    accountId: string;

    @IsNotEmpty({message: 'Mã câu hỏi không được để trống'})
    @IsString({message: 'Mã câu hỏi phải là một chuỗi'})
    @ApiProperty({type: String})
    questionId: string
}