import { ImgurController } from './imgur.controller';
import { Module } from "@nestjs/common";
import { ImgurService } from './imgur.service';

@Module({
    controllers: [ImgurController],
    providers: [ImgurService],
    exports: [ImgurModule],
})
export class ImgurModule{}