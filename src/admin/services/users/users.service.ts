import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/admin/user.entity';
import { CONSTANTS } from 'src/constants';

@Injectable()
export class UsersService {
    public users : User[] = [
        {
            username : "merchant",
            password : "merchant",
            email : "@gmail.com",
            role : CONSTANTS.ROLES.MERCHANT
        },
        {
            username : "agent",
            password : "agent",
            email : "@gmail.com",
            role : CONSTANTS.ROLES.CLIENT
        },
        {
            username : "client",
            password : "client",
            email : "@gmail.com",
            role : CONSTANTS.ROLES.AGENT
        },
    ];

    getUserByUserName(userName: string): User {
        const user = this.users.find(
          (user: User) => user.username === userName
        );
        if (!user) {
          throw new NotFoundException(`User with username "${userName}" not found`);
        }
        return user;
      }
    
}


