import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class AnswerDto {
    id: string;

    @IsString()
    @ApiProperty({ type: String })
    title: string;

    @IsString()
    @ApiProperty({ type: String })
    answerA: string;

    @IsString()
    @ApiProperty({ type: String })
    answerB: string;

    @IsString()
    @ApiProperty({ type: String })
    answerC: string;

    @IsString()
    @ApiProperty({ type: String })
    answerD: string;

    @IsString()
    @ApiProperty({ type: String })
    trueAnswer: string;

}