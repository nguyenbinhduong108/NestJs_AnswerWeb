import { Controller, Get, Param } from "@nestjs/common";
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


}