import { AnswerDto } from 'src/dto/answer.dto';
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AnswerService } from "./answer.service";

@Controller('answer')
@ApiTags('Answer')
export class AnswerController {

    constructor(private readonly answerService: AnswerService) { }

    @Get("GetByQuestionId/:id")
    async getAllByQuestionId(@Param("id") id: string){
        const result = await this.answerService.getAllByQuestionId(id);

        return result;
    }

    @Get("GetOne/:id")
    async getOneById(@Param("id") id: string){
        const result = await this.answerService.getOneById(id);

        return result;
    }

    @Post(":questionId")
    async creatAnswerByQuestionId(@Param("questionId") id: string, @Body() answerDto: AnswerDto){
        const result = await this.answerService.creatAnswerByQuestionId(id, answerDto);

        return result;
    }
}