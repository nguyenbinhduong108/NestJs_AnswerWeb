import { AnswerDto } from 'src/dto/answer.dto';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, Scope } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AnswerService } from "./answer.service";

@Controller({
    path:'answers',
    scope: Scope.REQUEST
})
@ApiTags('Answer')
export class AnswerController {

    constructor(private readonly answerService: AnswerService) { }

    @Get("GetByQuestionId/:id")
    async getAllAnswerByQuestionId(@Param("id") id: string, @Res() res){
        const result = await this.answerService.getAllAnswerByQuestionId(id);

        return res.status(HttpStatus.OK).json(result);
    }

    @Get("GetOne/:id")
    async getOneById(@Param("id") id: string, @Res() res){
        const result = await this.answerService.getOneById(id);

        return res.status(HttpStatus.OK).json(result);
    }

    @Post(":questionId")
    async creatAnswerByQuestionId(@Param("questionId") questionId: string, @Body() answerDto: AnswerDto, @Res() res){
        const result = await this.answerService.creatAnswerByQuestionId(questionId, answerDto);

        return res.status(HttpStatus.ACCEPTED).json(result);
    }

    @Put(":id")
    async updateAnswerById(@Param("id") id: string, @Body() answerDto: AnswerDto, @Res() res) {
        const result = await this.answerService.updateAnswerById(id, answerDto);

        return res.status(HttpStatus.OK).json(result);
    }


    @Delete(":id")
    async deleteAnswerById(@Param("id") id: string, @Res() res){
        const result = await this.answerService.deleteAnswerById(id);

        return res.status(HttpStatus.OK).json(result);
    }
}