import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransectionController } from './controllers/transection/transection.controller';
import { TransectionEntity } from './entity/transection.entity';
import { CruduserService } from './services/cruduser/cruduser.service';
import { TransectionService } from './services/transection/transection.service';
import { UsersService } from './services/users/users.service';
import { RoleAssignService } from './services/role-assign/role-assign.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { RolesGuard } from 'src/role.guard';
import { UserEntity } from './entity/user.entity';
import { CurrencyController } from './controllers/currency/currency.controller';
import { CurrencyService } from './services/currency/currency.service';
import { CurrencyEntity } from './entity/currency.entity';
import { ExchangeEntity } from './entity/exchange.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/auth/local.strategy';


@Module({
    imports:[ 
        TypeOrmModule.forFeature([
            UserEntity, TransectionEntity, CurrencyEntity, ExchangeEntity
        ]),
        PassportModule.register({ session: true }),TypeOrmModule.forFeature([UserEntity]), 
        PassportModule.register({ defaultStrategy: 'local', session: true }),
    ],
    controllers:[AuthController, CurrencyController],
    providers:[LocalStrategy, UsersService,TransectionService, CruduserService, RoleAssignService,AuthService, JwtService,RolesGuard,CurrencyService,JwtStrategy],
    exports:[UsersService, TransectionService,RolesGuard]
     /*{
      provide: APP_GUARD,
      useClass: LocalAuthGuard,
    },*/
})
export class AdminModule {}

