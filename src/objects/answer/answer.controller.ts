import { AnswerDto } from 'src/dto/answer.dto';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, Scope } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AnswerService } from "./answer.service";

@Controller({
    path: 'answers',
    scope: Scope.REQUEST
})
@ApiTags('Answer')
export class AnswerController {

    constructor(private readonly answerService: AnswerService) { }

    @Get("GetByQuestionId/:questionId")
    async getAllAnswerByQuestionId(@Param("questionId") questionId: string, @Res() res) {
        const result = await this.answerService.getAllAnswerByQuestionId(questionId);

        return res.status(HttpStatus.OK).json(result);
    }

    @Get("GetOne/:answerId")
    async getOneById(@Param("answerId") answerId: string, @Res() res) {
        const result = await this.answerService.getOneById(answerId);

        return res.status(HttpStatus.OK).json(result);
    }

    @Post(":questionId")
    async creatAnswerByQuestionId(@Param("questionId") questionId: string, @Body() answerDto: AnswerDto, @Res() res) {
        const result = await this.answerService.creatAnswerByQuestionId(questionId, answerDto);

        return res.status(HttpStatus.ACCEPTED).json(result);
    }

    @Put(":answerId")
    async updateAnswerById(@Param("answerId") answerId: string, @Body() answerDto: AnswerDto, @Res() res) {
        const result = await this.answerService.updateAnswerById(answerId, answerDto);

        return res.status(HttpStatus.OK).json(result);
    }


    @Delete(":answerId")
    async deleteAnswerById(@Param("answerId") answerId: string, @Res() res) {
        const result = await this.answerService.deleteAnswerById(answerId);

        return res.status(HttpStatus.OK).json(result);
    }
}