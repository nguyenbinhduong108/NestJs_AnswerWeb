import { ApiProperty } from '@nestjs/swagger';
import { IsString } from "class-validator";

export class QuestionDto{
    id: string;

    @IsString()
    @ApiProperty({type: String})
    name: string;

    @IsString()
    @ApiProperty({type: String})
    accountId: string;

    @IsString()
    @ApiProperty({type: String})
    categoryId: string;
}