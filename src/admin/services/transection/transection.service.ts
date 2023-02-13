import {Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from 'src/admin/client.entity';
import { TransectionEntity } from 'src/admin/transection.entity';
import { Repository } from 'typeorm';
import { TransectionForm } from '../dto/transectionform.dto';


@Injectable()
export class TransectionService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepo: Repository<ClientEntity>,
    @InjectRepository(TransectionEntity)
    private transectionRepo: Repository<TransectionEntity>,
  ) {}

  async moneyTransfer( transferdto:TransectionForm): Promise<any> {
    const fromUser = await this.clientRepo.findOneBy({ id: transferdto.senderid });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const toUser = await this.clientRepo.findOneBy({ id: transferdto.reciverid });

    if (!fromUser || !toUser) {
      return 'User not found!';
    }

    if (fromUser.balance < transferdto.amount) {
      return 'Insufficient balance!';
    }
                                
    toUser.balance += transferdto.amount;
    await new Promise((resolve) => setTimeout(resolve, 2000)); 
    fromUser.balance -= transferdto.amount;  
       
    await this.clientRepo.save(fromUser);    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await this.clientRepo.save(toUser);
                               
    const transferacount = new TransectionEntity()
    transferacount.senderid = transferdto.senderid;
    transferacount.reciverid = transferdto.reciverid;
    transferacount.amount = transferdto.amount;
    return this.transectionRepo.save(transferacount);
    }
}
   



