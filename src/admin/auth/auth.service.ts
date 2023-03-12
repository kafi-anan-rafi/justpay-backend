import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException, Session, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { LoginForm } from '../services/dto/login.dto';
import { UserForm } from '../services/dto/userform.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private mailerService: MailerService
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

async sendEmail(emaildata) {
  return   await this.mailerService.sendMail({
    to: emaildata.email,
    subject: emaildata.subject,
    text: emaildata.text, 
  });
}
}


  



