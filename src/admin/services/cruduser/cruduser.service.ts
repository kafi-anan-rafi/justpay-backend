import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/admin/entity/user.entity';
import { Repository } from 'typeorm';
import { UserForm } from '../dto/userform.dto';


@Injectable()
export class CruduserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
      ) {}
    
      insertUser(mydto:UserForm) {
       const useraccount = new UserEntity();
       useraccount.createStatus = false;
       useraccount.updateStatus = false;
       useraccount.deleteStatus = false;        
       return this.userRepo.save(mydto);
    }

    async updateUser(id: number, mydto: UserForm) {
      const useraccount = await this.userRepo.findOneBy({id});
      if (!useraccount) {
        throw new NotFoundException(`User with id ${id} not found.`);
      }
  
    useraccount.name = mydto.name || useraccount.name;
    useraccount.dob = mydto.dob || useraccount.dob;
    useraccount.uname = mydto.uname || useraccount.uname;
    useraccount.pass = mydto.pass || useraccount.pass;
    useraccount.phone = mydto.phone || useraccount.phone;
    useraccount.balance = mydto.balance || useraccount.balance;
    return this.userRepo.save(useraccount);
    }

    async deleteUser(id: number) {
      const useraccount = await this.userRepo.findOneBy({id});
      if (!useraccount) {
        throw new NotFoundException(`User with id ${id} not found.`);
      }
  
      return this.userRepo.remove(useraccount);
    }

    async getUser(id: number) {
      const useraccount = await this.userRepo.findOneBy({id});
      if (!useraccount) {
        throw new NotFoundException(`User with id ${id} not found.`);
      }
      return useraccount;
  }
}


