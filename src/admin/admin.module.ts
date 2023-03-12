import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransectionEntity } from './entity/transection.entity';
import { CruduserService } from './services/cruduser/cruduser.service';
import { TransectionService } from './services/transection/transection.service';
import { UsersService } from './services/users/users.service';
import { RoleAssignService } from './services/role-assign/role-assign.service';

import { AuthController } from './controllers/auth/auth.controller';
import { UserEntity } from './entity/user.entity';
import { CurrencyController } from './controllers/currency/currency.controller';
import { CurrencyService } from './services/currency/currency.service';
import { CurrencyEntity } from './entity/currency.entity';
import { ExchangeEntity } from './entity/exchange.entity';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MailerModule } from '@nestjs-modules/mailer';
import { LocalStrategy } from './auth/local.strategy';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';


@Module({
    imports:[ 
        TypeOrmModule.forFeature([
            UserEntity, TransectionEntity, CurrencyEntity, ExchangeEntity
        ]),
        MailerModule.forRoot({
          transport: {
            host: 'smtp.gmail.com',
            port: 465,
            ignoreTLS: true,
            secure: false,
            auth: {
              user: 'smricky1999@@gmail.com',
              pass: 'nlydsnkeyhxzlire',
             // pass: 'hkqxgqohuoxaafwu',
            },
          }
        }),              
           
        PassportModule.register({ session: true }),TypeOrmModule.forFeature([UserEntity]), 
        PassportModule.register({ defaultStrategy: 'local', session: true }),
    ],
    controllers:[AuthController, CurrencyController],
    providers:[LocalStrategy, UsersService,TransectionService, CruduserService, RoleAssignService,
    AuthService, JwtService,CurrencyService,JwtStrategy],
    exports:[UsersService, TransectionService]
     /*{
      provide: APP_GUARD,
      useClass: LocalAuthGuard,
    },*/
})
export class AdminModule {}

