import { AnswerDto } from 'src/dto/answer.dto';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AnswerService } from "./answer.service";

@Controller('answer')
@ApiTags('Answer')
export class AnswerController {

    constructor(private readonly answerService: AnswerService) { }

    @Get("GetByQuestionId/:id")
    async getAllAnswerByQuestionId(@Param("id") id: string){
        const result = await this.answerService.getAllAnswerByQuestionId(id);

        return result;
    }

    @Get("GetOne/:id")
    async getOneById(@Param("id") id: string){
        const result = await this.answerService.getOneById(id);

        return result;
    }

    @Post(":questionId")
    async creatAnswerByQuestionId(@Param("questionId") questionId: string, @Body() answerDto: AnswerDto){
        const result = await this.answerService.creatAnswerByQuestionId(questionId, answerDto);

        return result;
    }

    @Put(":id")
    async updateAnswerById(@Param("id") id: string, @Body() answerDto: AnswerDto, @Res() res) {
        await this.answerService.updateAnswerById(id, answerDto);

        return res.status(HttpStatus.OK).json("Cập nhật câu hỏi thành công");
    }


    @Delete(":id")
    async deleteAnswerById(@Param("id") id: string, @Res() res){
        await this.answerService.deleteAnswerById(id);

        return res.status(HttpStatus.OK).json("Xoá câu hỏi thành công");
    }
}