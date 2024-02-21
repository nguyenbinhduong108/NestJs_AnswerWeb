import { HttpException, Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class ImgurService {


    async uploadImageToImgur(imageData: Buffer) {

        const clientId = '2d6e152d9848d29'; 
        const headers = {
            'Authorization': `Client-ID ${clientId}`,
            'Content-Type': 'multipart / form-data',
        };

        try {
            console.log(2);
            const response = await axios.post('https://api.imgur.com/3/upload', imageData, {
                headers
            });
            console.log(response);
            return response.data.data.link;
        } catch (error) {
            console.log(6);
            throw new HttpException('Không thể tạo avatar', 500);
        }
    }
}
