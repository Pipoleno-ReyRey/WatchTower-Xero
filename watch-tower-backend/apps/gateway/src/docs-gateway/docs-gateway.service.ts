import { HttpException, Injectable } from '@nestjs/common';
import { documentDto } from 'core/dtos/document.dto';

@Injectable()
export class DocsGatewayService {

    async getAllDocs(token: string){
        try{
            let data = await fetch("http://localhost:8005/docs", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "token": token
            }
        });

        if(data.ok){
            return await data.json();
        } else {
            throw new HttpException("error", 404);
        }
        } catch(error: any){
            throw new HttpException(error.message, 500);
        }
    }
}
