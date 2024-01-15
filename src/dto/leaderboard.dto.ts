import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LeaderboardDto{
    id: string;

    @IsNotEmpty({message: 'Kết quả không được để trống'})
    @IsNumber({}, {message: 'Kết quả là 1 số'})
    @ApiProperty({ type: Number })
    result: number;

    @IsNotEmpty({message: 'Thời gian không được để trống'})
    @IsNumber({}, {message: 'Thời gian là 1 số'})
    @ApiProperty({ type: Number })
    timer: number;

    @IsNotEmpty({message: 'Bộ câu hỏi không được để trống'})
    @IsString({message: 'Bộ câu hỏi không hợp lệ'})
    @ApiProperty({ type: String })
    questionId: string;

    @IsNotEmpty({message: 'Tài khoản không được để trống'})
    @IsString({message: "Tài khoản không hợp lệ"})
    @ApiProperty({ type: String })
    accountId: string;
}