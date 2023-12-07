import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { ImgurService } from "./imgur.service";

@Controller('imgur')
@ApiTags('Imgur')
export class ImgurController{

    constructor(private readonly imgurService: ImgurService){}

    @Post()
    @UseInterceptors(FileInterceptor('avatar'))
    async uploadImgage(@UploadedFile() avatarFile): Promise<string> {
        const result = await this.imgurService.uploadImageToImgur(avatarFile.buffer);

        return result;
    }
}