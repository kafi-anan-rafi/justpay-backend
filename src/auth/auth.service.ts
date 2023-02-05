import {Injectable} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/admin/user.entity';

@Injectable()
export class AuthService{
    constructor(private readonly jwtservice : JwtService){
        
    }

    generateToken(payload :User) : string{
        return this.jwtservice.sign(payload);
    }

}