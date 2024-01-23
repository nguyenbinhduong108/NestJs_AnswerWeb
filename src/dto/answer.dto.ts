import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AnswerDto {
    id: string;

    @IsNotEmpty({message: "Câu hỏi không được để trống"})
    @IsString({message: "Câu hỏi không hợp lệ"})
    @ApiProperty({ type: String })
    title: string;

    @IsNotEmpty({message: "Câu trả lời không được để trống"})
    @ApiProperty({ type: Array<string> })
    answers: Array<string>;

    @IsNotEmpty({message: "Đáp án không được để trống"})
    @IsString({message: "Đáp án không hợp lệ"})
    @ApiProperty({ type: String })
    trueAnswer: string;

    @IsOptional()
    @IsString({message: 'Ảnh phải là 1 chuỗi'})
    @ApiProperty({type: String, default: "https://i.imgur.com/oJN9YcQ.jpg"})
    image: string;
}