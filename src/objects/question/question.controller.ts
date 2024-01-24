import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res, Scope } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
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
    @ApiQuery({
        name: "search",
        type: String,
        required: false
    })
    async getAllQuestion(@Res() res, @Query('limit') limit: number, @Query('page') page: number, @Query('search') search?: string) {
        
        const result = await this.questionService.getAll(limit, page, search);

        return res.status(HttpStatus.OK).json(result);
    }

    @Get("getAllQuestionByAccountId/:accountId")
    @ApiQuery({
        name: "search",
        type: String,
        required: false
    })
    async getAllQuestionByAccountId(@Param("accountId") accountId: string, @Res() res, @Query('limit') limit: number, @Query('page') page: number, @Query('search') search?: string) {
        const result = await this.questionService.getAllQuestionByAccountId(accountId, limit, page, search);

        return res.status(HttpStatus.OK).json(result);
    }

    @Get("getAllQuestionByCategoryId/:categoryId")
    @ApiQuery({
        name: "search",
        type: String,
        required: false
    })
    async getAllQuestionByCategoryId(@Param("categoryId") categoryId: string, @Res() res, @Query('limit') limit: number, @Query('page') page: number, @Query('search') search?: string) {
        const result = await this.questionService.getAllQuestionByCategoryId(categoryId, limit, page, search);

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

