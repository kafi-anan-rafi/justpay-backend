import { Body, Controller, Param, Post, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { CruduserService } from '../services/cruduser/cruduser.service';
import { UserForm } from '../services/dto/userform.dto';


@Controller('role')
export class RoleController {
    constructor(private readonly cruduserService: CruduserService,
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,) {}
    
    @Post(':id')
    async insertuser(@Param('id') id: number,@Body()mydto:UserForm):Promise <any> {
        const useraccount = await this.userRepo.findOneBy({id});
      if (useraccount.createStatus == false) {
        throw new UnauthorizedException(`User with id ${id} not allowed to perform create operation.`);
      }
     return this.cruduserService.insertUser(mydto);
  }  
}
