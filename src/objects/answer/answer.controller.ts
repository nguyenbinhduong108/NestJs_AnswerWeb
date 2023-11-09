import { AnswerDto } from 'src/dto/answer.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
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

    @Put(":id")
    async updateAnswerById(@Param("id") id: string, @Body() answerDto: AnswerDto) {
        const result = await this.answerService.updateAnswerById(id, answerDto);

        return result;
    }


    @Delete(":id")
    async deleteAnswerById(@Param("id") id: string){
        const result = await this.answerService.deleteAnswerById(id);

        return result;
    }
}