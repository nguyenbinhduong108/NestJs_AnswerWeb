import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CommentDto } from "src/dto/comment.dto";
import { CommentsService } from './comments.service';

@Controller('comments')
@ApiTags('Comments')
export class CommentsController {

    constructor(private readonly commentsService: CommentsService) { }

    @Get(':questionId')
    async getComments(@Res() res, @Param('questionId') questionId: string, @Query('page') page: number) {

        const result = await this.commentsService.getComments(questionId, page);

        return res.status(HttpStatus.OK).json(result);
    }

    @Post()
    async createComments(@Res() res, @Body() commentsDto: CommentDto) {

        const result = await this.commentsService.createComments(commentsDto);

        return res.status(HttpStatus.OK).json(result);
    }

    @Put(':id')
    async updateComments(@Res() res, @Param('id') id: string, @Body() commentsDto: CommentDto) {

        const result = await this.commentsService.updateComments(id, commentsDto);

        return res.status(HttpStatus.OK).json(result);
    }

    @Delete('id')
    async deleteComments(@Res() res, @Param('id') id: string) {

        const result = await this.commentsService.deleteComments(id);

        return res.status(HttpStatus.OK).json(result);
    }
}