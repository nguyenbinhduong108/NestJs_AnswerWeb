import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { QuestionService } from "./question.service";
import { QuestionDto } from "src/dto/question.dto";

@Controller('question')
@ApiTags('Question')
export class QuestionController {

    constructor(private readonly questionService: QuestionService) { }

    @Get("GetAll")
    async getAllQuestion() {
        const result = await this.questionService.getAll();

        return result;
    }

    @Get("getAllQuestionByAccountId/:id")
    async getAllQuestionByAccountId(@Param("id") id: string,@Res() res) {
        const result = await this.questionService.getAllQuestionByAccountId(id);

        if (result) {
            return res.status(HttpStatus.OK).json(result);
        }
        else {
            return res.status(HttpStatus.NOT_FOUND).json(null);
        }
    }

    @Get("getAllQuestionByCategoryId/:id")
    async getAllQuestionByCategoryId(@Param("id") id:string, @Res() res){
        const result = await this.questionService.getAllQuestionByCategoryId(id);

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
    async updateQuestion(@Param("id") id: string, @Body() questionDto: QuestionDto, @Res() res){
        const result = await this.questionService.update(id, questionDto);

        if(result === true){
            return res.status(HttpStatus.OK).json("Cập nhật câu hỏi thành công");
        }
        else{
            return res.status(HttpStatus.BAD_REQUEST).json("Cập nhật câu hỏi thành công");
        }
    }

    @Delete(":id")
    async deleteQuestion(@Param("id") id: string, @Res() res) {
        const result = await this.questionService.delete(id);

        if(result){
            return res.status(HttpStatus.OK).json("Xoá thành công");
        }
        else{
            return res.status(HttpStatus.BAD_REQUEST).json("Xoá không thành công");
        }
    }
}

