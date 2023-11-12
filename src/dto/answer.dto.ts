import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AnswerDto {
    id: string;

    @IsNotEmpty({message: "Câu hỏi không được để trống"})
    @IsString({message: "Câu hỏi không hợp lệ"})
    @ApiProperty({ type: String })
    title: string;

    @IsNotEmpty({message: "Câu trả lời không được để trống"})
    @IsString({message: "Câu trả lời không hợp lệ"})
    @ApiProperty({ type: String })
    answerA: string;

    @IsNotEmpty({message: "Câu trả lời không được để trống"})
    @IsString({message: "Câu trả lời không hợp lệ"})
    @ApiProperty({ type: String })
    answerB: string;

    @IsNotEmpty({message: "Câu trả lời không được để trống"})
    @IsString({message: "Câu trả lời không hợp lệ"})
    @ApiProperty({ type: String })
    answerC: string;

    @IsNotEmpty({message: "Câu trả lời không được để trống"})
    @IsString({message: "Câu trả lời không hợp lệ"})
    @ApiProperty({ type: String })
    answerD: string;

    @IsNotEmpty({message: "Đáp án không được để trống"})
    @IsString({message: "Đáp án không hợp lệ"})
    @ApiProperty({ type: String })
    trueAnswer: string;

    @IsOptional()
    @ApiProperty({type: String, default: "https://i.imgur.com/oJN9YcQ.jpg"})
    image: string;

}