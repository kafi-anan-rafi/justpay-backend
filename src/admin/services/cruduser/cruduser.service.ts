import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from 'src/admin/client.entity';
import { Repository } from 'typeorm';
import { ClientForm } from '../dto/clientform.dto';

@Injectable()
export class CruduserService {
    constructor(
        @InjectRepository(ClientEntity)
        private clientRepo: Repository<ClientEntity>,
      ) {}
    
      insertUser(mydto:ClientForm) {
        const useracount = new ClientEntity()
        useracount.name = mydto.name;
        useracount.dob = mydto.dob;
        useracount.uname = mydto.uname;
        useracount.pass = mydto.pass;
        useracount.phone = mydto.phone;
        useracount.balance = mydto.balance;
       return this.clientRepo.save(useracount);
    }
}
