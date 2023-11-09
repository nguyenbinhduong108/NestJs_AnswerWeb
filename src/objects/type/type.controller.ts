import { Controller, Get, HttpStatus, Param, Res } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger";
import { TypeService } from "./type.service";

@Controller('type')
@ApiTags("Type")
export class TypeController {

    constructor(private readonly typeService: TypeService) { }

    @Get()
    async getAllType(@Res() res) {

        const result = await this.typeService.getAll();

        return res.status(HttpStatus.OK).json(result);
    }

    @Get(':id')
    async getOneType(@Param('id') id: string, @Res() res){
        const result = await this.typeService.getOne(id);

        return res.status(HttpStatus.OK).json(result);
    }   
}