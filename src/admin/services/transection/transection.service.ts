import {Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/admin/entity/user.entity';
import { TransectionEntity } from 'src/admin/entity/transection.entity';
import { Repository } from 'typeorm';
import { TransectionForm } from '../dto/transectionform.dto';


@Injectable()
export class TransectionService {
  constructor(
    @InjectRepository(UserEntity)
    private clientRepo: Repository<UserEntity>,
    @InjectRepository(TransectionEntity)
    private transectionRepo: Repository<TransectionEntity>,
  ) {}

  async moneyTransfer( transferdto:TransectionForm): Promise<any> {
    const fromUser = await this.clientRepo.findOneBy({ id: transferdto.senderid });
    const toUser = await this.clientRepo.findOneBy({ id: transferdto.reciverid });
    if (!fromUser || !toUser) {
      return 'User not found!';
    }

    if (fromUser.balance < transferdto.amount) {
      return 'Insufficient balance!';
    }
                                
    
    fromUser.balance = this.sub( transferdto.amount,toUser.balance); 
    toUser.balance = this.add( transferdto.amount,toUser.balance); 
   
    console.log(fromUser.balance);
    console.log(toUser.balance);
    await this.clientRepo.save(fromUser);    
    await this.clientRepo.save(toUser);
                               
     const transferacount = new TransectionEntity()
     transferacount.senderid = transferdto.senderid;
     transferacount.reciverid = transferdto.reciverid;
     transferacount.amount = transferdto.amount;
     return this.transectionRepo.save(transferacount);
    }

    add(a:number, b:number):number
    {
      return a+b;
    }

    sub(a:number, b:number):number
    {
      return a-b;
    }
}
   



