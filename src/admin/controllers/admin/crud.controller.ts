import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ClientForm } from 'src/admin/services/dto/clientform.dto';
import { CruduserService } from 'src/admin/services/cruduser/cruduser.service';


@Controller('crud')
export class CrudController {
    constructor(private readonly cruduserService: CruduserService) {}
    
      @Post('insertuser')
      insertuser(@Body()mydto:ClientForm):Promise <any> {
       return this.cruduserService.insertUser(mydto);
    }  
}

