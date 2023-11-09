import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AnswerQuestion{
    @IsString()
    id: string;

    @IsString()
    @ApiProperty({type: String})
    title: string;

    @IsString()
    @ApiProperty({type: String})
    answerA: string;

    @IsString()
    @ApiProperty({type: String})
    answerB: string;

    @IsString()
    @ApiProperty({type: String})
    answerC: string;

    @IsString()
    @ApiProperty({type: String})
    answerD: string;

    @IsString()
    @ApiProperty({type: String})
    trueAnswer: string;

}