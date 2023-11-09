import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class AnswerDto {
    id: string;

    @IsOptional()
    @ApiProperty({ type: String })
    title: string;

    @IsOptional()
    @ApiProperty({ type: String })
    answerA: string;

    @IsOptional()
    @ApiProperty({ type: String })
    answerB: string;

    @IsOptional()
    @ApiProperty({ type: String })
    answerC: string;

    @IsOptional()
    @ApiProperty({ type: String })
    answerD: string;

    @IsOptional()
    @ApiProperty({ type: String })
    trueAnswer: string;

    @IsOptional()
    @ApiProperty({type: String, default: "https://i.imgur.com/oJN9YcQ.jpg"})
    image: string;

}