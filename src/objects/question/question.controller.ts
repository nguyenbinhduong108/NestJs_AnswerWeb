import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res, Scope } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { QuestionService } from "./question.service";
import { QuestionDto } from "src/dto/question.dto";

@Controller({
    path: 'question',
    scope: Scope.REQUEST,
})
@ApiTags('Question')
export class QuestionController {

    constructor(private readonly questionService: QuestionService) { }

    @Get("GetAll")
    async getAllQuestion(@Res() res) {
        const result = await this.questionService.getAll();

        return res.status(HttpStatus.OK).json(result);
    }

    @Get("getAllQuestionByAccountId/:id")
    async getAllQuestionByAccountId(@Param("id") id: string, @Res() res) {
        const result = await this.questionService.getAllQuestionByAccountId(id);

        return res.status(HttpStatus.OK).json(result);
    }

    @Get("getAllQuestionByCategoryId/:id")
    async getAllQuestionByCategoryId(@Param("id") id: string, @Res() res) {
        const result = await this.questionService.getAllQuestionByCategoryId(id);

        return res.status(HttpStatus.OK).json(result);
    }

    @Get(":id")
    async getOneQuestion(@Param("id") id: string, @Res() res) {
        const result = await this.questionService.getOne(id);

        return res.status(HttpStatus.OK).json(result);
    }

    @Post()
    async createQuestion(@Body() questionDto: QuestionDto, @Res() res) {
        const result = await this.questionService.createQuestion(questionDto);

        return res.status(HttpStatus.ACCEPTED).json(result);
    }

    @Put(":id")
    async updateQuestion(@Param("id") id: string, @Body() questionDto: QuestionDto, @Res() res) {
        const result = await this.questionService.updateQuestion(id, questionDto);

        return res.status(HttpStatus.OK).json(result);
    }

    @Delete(":id")
    async deleteQuestion(@Param("id") id: string, @Res() res) {
        const result = await this.questionService.deleteQuestion(id);

        return res.status(HttpStatus.OK).json(result);
    }
}

