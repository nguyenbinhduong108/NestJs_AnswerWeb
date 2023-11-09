import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { QuestionService } from "./question.service";
import { QuestionDto } from "src/dto/question.dto";

@Controller('question')
@ApiTags('Question')
export class QuestionController {

    constructor(private readonly questionService: QuestionService) { }

    @Get()
    async getAllQuestion(@Res() res) {
        const result = await this.questionService.getAll();

        if (result) {
            return res.status(HttpStatus.OK).json(result);
        }
        else {
            return res.status(HttpStatus.NOT_FOUND).json(null);
        }
    }

    @Get(":id")
    async getOneQuestion(@Param("id") id: string, @Res() res) {
        const result = await this.questionService.getOne(id);

        if (result) {
            return res.status(HttpStatus.OK).json(result);
        }
        else {
            return res.status(HttpStatus.NOT_FOUND).json(null);
        }
    }

    @Post()
    async createQuestion(@Body() questionDto: QuestionDto, @Res() res) {
        const result = await this.questionService.create(questionDto);

        return res.status(HttpStatus.OK).json(result);
    }

    @Put(":id")
    async updateQuestion(@Param("id") id: string, @Body() questionDto: QuestionDto){
        const result = await this.questionService.update(id, questionDto);

        return result;
    }

    @Delete(":id")
    async deleteQuestion(@Param("id") id: string, @Res() res) {
        const result = await this.questionService.delete(id);

        if(result){
            return res.status(HttpStatus.OK).json(result);
        }
        else{
            return res.status(HttpStatus.NOT_FOUND).json(result);
        }
    }
}

