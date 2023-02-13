import { Body, Controller, Post } from '@nestjs/common';
import { TransectionForm } from '../services/dto/transectionform.dto';
import { TransectionService } from '../services/transection/transection.service';


@Controller('transection')
export class TransectionController {
    constructor(private readonly transectionService: TransectionService) {}

    @Post('transfer')
      transfer (@Body()transferdto:TransectionForm):Promise <any>{
        return this.transectionService.moneyTransfer(transferdto);
}      
}
