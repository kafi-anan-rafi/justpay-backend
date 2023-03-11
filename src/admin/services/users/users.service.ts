import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/admin/entity/user.entity';
import { CONSTANTS } from 'src/constants';
import { Repository } from 'typeorm';
import { LoginForm } from '../dto/login.dto';


@Injectable()
export class UsersService {
  constructor(   
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,    
  ) {}   

  async validateLogin(userdto: LoginForm): Promise<{ username: string, password: string }> {
    const user = await this.userRepo.findOneBy({ uname: userdto.username, pass: userdto.password });
    if (!user) {
      throw new NotFoundException(`User with username "${userdto.username}" not found`);
    }
    return { password: user.pass, username: user.uname };
  }
}
