import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res, Scope } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { QuestionService } from "./question.service";
import { QuestionDto } from "src/dto/question.dto";

@Controller({
    path: 'questions',
    scope: Scope.REQUEST,
})
@ApiTags('Question')
export class QuestionController {

    constructor(private readonly questionService: QuestionService) { }

    @Get("GetAll")
    async getAllQuestion(@Query('limit') limit: number, @Query('offset') offset: number, @Query('search') search: string ,@Res() res) {
        const result = await this.questionService.getAll(limit, offset, search);

        return res.status(HttpStatus.OK).json(result);
    }

    @Get("getAllQuestionByAccountId/:accountId")
    async getAllQuestionByAccountId(@Param("accountId") accountId: string, @Query('limit') limit: number, @Query('offset') offset: number, @Query('search') search: string ,@Res() res) {
        const result = await this.questionService.getAllQuestionByAccountId(accountId, limit, offset, search);

        return res.status(HttpStatus.OK).json(result);
    }

    @Get("getAllQuestionByCategoryId/:categoryId")
    async getAllQuestionByCategoryId(@Param("categoryId") categoryId: string, @Query('limit') limit: number, @Query('offset') offset: number, @Query('search') search: string ,@Res() res) {
        const result = await this.questionService.getAllQuestionByCategoryId(categoryId, limit, offset, search);

        return res.status(HttpStatus.OK).json(result);
    }

    @Get(":questionId")
    async getOneQuestionByQuestionId(@Param("questionId") questionId: string, @Res() res) {
        const result = await this.questionService.getOneQuestionByQuestionId(questionId);

        return res.status(HttpStatus.OK).json(result);
    }

    @Post()
    async createQuestion(@Body() questionDto: QuestionDto, @Res() res) {
        const result = await this.questionService.createQuestion(questionDto);

        return res.status(HttpStatus.ACCEPTED).json(result);
    }

    @Put(":questionId")
    async updateQuestion(@Param("questionId") questionId: string, @Body() questionDto: QuestionDto, @Res() res) {
        const result = await this.questionService.updateQuestion(questionId, questionDto);

        return res.status(HttpStatus.OK).json(result);
    }

    @Delete(":questionId")
    async deleteQuestion(@Param("questionId") questionId: string, @Res() res) {
        const result = await this.questionService.deleteQuestion(questionId);

        return res.status(HttpStatus.OK).json(result);
    }
}

