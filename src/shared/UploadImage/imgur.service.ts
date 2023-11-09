import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class ImgurService {


    async uploadImageToImgur(imageData: Buffer): Promise<string> {

        const clientId = '93319ee59de2f4e'; 
        const headers = {
            'Authorization': `Client-ID ${clientId}`,
            'Content-Type': 'application/json',
        };

        try {
            const response = await axios.post('https://api.imgur.com/3/image', imageData, {
                headers,
            });

            return response.data.data.link;
        } catch (error) {
            throw new Error('Không thể tạo avatar');
        }
    }
}
