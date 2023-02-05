import { Module, Options } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from 'src/admin/admin.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import {JwtStrategy} from './jwt.strategy';

@Module({
    imports:[PassportModule, AdminModule, 
        JwtModule.register({
            secret :"key",
            signOptions :{
                expiresIn : "60s"
            }
        })], 
    controllers:[],
    providers:[LocalStrategy, AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
