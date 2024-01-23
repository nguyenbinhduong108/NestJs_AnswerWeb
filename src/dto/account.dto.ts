import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AccountDto{
    id: string;

    @IsNotEmpty({message: "Mật khẩu không được để trống"})
    @IsString({message: "Mật khẩu không hợp lệ"})
    @ApiProperty({ type: String })
    password: string;

    @IsNotEmpty({message: "Email không được để trống"})
    @IsEmail({},{message: "Email không hợp lệ"})
    @ApiProperty({type: String})
    email: string;

    @IsNotEmpty({message: "Tên người dùng không được để trống"})
    @IsString({message: "Tên người dùng không hợp lệ"})
    @ApiProperty({type: String})
    username: string;

    @IsOptional()
    @IsString({message: 'Ảnh đại diện phải là một chuỗi'})
    @ApiProperty({type: String, default: 'https://i.imgur.com/t9Y4WFN.jpg'})
    avatar: string;

    @IsOptional()
    @IsBoolean({message: 'Trạng thái không đúng định dạng'})
    @ApiProperty({type: Boolean, default: false})
    isAdmin: boolean;
}