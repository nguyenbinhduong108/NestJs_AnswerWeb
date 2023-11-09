import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class CategoryDto{
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    image: string;
}