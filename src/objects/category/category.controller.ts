import { Controller, Get, HttpStatus, Param, Res } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger";
import { CategoryService } from "./category.service";

@Controller('category')
@ApiTags("Category")
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    async getAllCategory(@Res() res) {

        const result = await this.categoryService.getAll();

        return res.status(HttpStatus.OK).json(result);
    }

    @Get(':id')
    async getOneCategory(@Param('id') id: string, @Res() res){
        const result = await this.categoryService.getOne(id);

        return res.status(HttpStatus.OK).json(result);
    }   
}