import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-local";
import { UsersService } from "src/admin/services/users/users.service";
import { User } from "src/admin/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private readonly userService : UsersService){
        super();
    }

    validate(username:string, password:string):User{
        const user : User = this.userService.getUserByUserName(username);
        if(user === undefined) throw new UnauthorizedException();
        if(user !== undefined && user.password === password){
            return user;
        }else{
            throw new UnauthorizedException();
        }
    }
    
}