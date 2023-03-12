import { Injectable, NotFoundException, Session, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/admin/entity/user.entity';
import { LoginForm } from 'src/admin/services/dto/login.dto';
import { UserForm } from 'src/admin/services/dto/userform.dto';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ uname: username });
    if (user && user.pass === password) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginForm) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
  }

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


  



