import { Controller, Get, Headers } from '@nestjs/common';
import { DocsGatewayService } from './docs-gateway.service';

@Controller('docs')
export class DocsGatewayController {
    constructor(private readonly service: DocsGatewayService){}

    @Get("/all")
    async all(@Headers("token") token: string){
        return await this.service.getAllDocs(token);
    }

}
