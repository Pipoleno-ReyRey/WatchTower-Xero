import { Controller, Get, Headers, HttpException, UnauthorizedException } from '@nestjs/common';
import { DocsGatewayService } from './docs-gateway.service';
import { documentDto } from 'core/dtos/document.dto';

@Controller('docs')
export class DocsGatewayController {
    constructor(private readonly service: DocsGatewayService){}

    @Get("/all")
    async all(@Headers("token") token: string){
        let response: documentDto[] | null = await this.service.getAllDocs(token);
        if(response){
            return response;
        } else {
            throw new UnauthorizedException();
        }
    }

}
