import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class AccountDto{
    id: string;

    @IsString()
    @ApiProperty({ type: String })
    password: string;

    @IsEmail()
    @ApiProperty({type: String})
    email: string;

    @IsString()
    @ApiProperty({type: String})
    username: string;

    @IsOptional()
    @ApiProperty({type: String, default: 'https://i.imgur.com/t9Y4WFN.jpg'})
    avatar: string;

    @IsOptional()
    @ApiProperty({type: Boolean, default: false})
    isAdmin: boolean
}