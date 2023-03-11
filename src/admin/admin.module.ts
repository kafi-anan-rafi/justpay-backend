import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransectionController } from './controllers/transection/transection.controller';
import { TransectionEntity } from './entity/transection.entity';
import { CruduserService } from './services/cruduser/cruduser.service';
import { TransectionService } from './services/transection/transection.service';
import { UsersService } from './services/users/users.service';
import { RoleController } from './role/role.controller';
import { RoleAssignController } from './role-assign/role-assign.controller';
import { RoleAssignService } from './services/role-assign/role-assign.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { RolesGuard } from 'src/role.guard';
import { UserEntity } from './entity/user.entity';
import { CurrencyController } from './controllers/currency/currency.controller';
import { CurrencyService } from './services/currency/currency.service';
import { CurrencyEntity } from './entity/currency.entity';
import { ExchangeEntity } from './entity/exchange.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtService } from '@nestjs/jwt';




@Module({
    imports:[AuthModule, TypeOrmModule.forFeature([UserEntity, TransectionEntity, CurrencyEntity, ExchangeEntity])],
    controllers:[ TransectionController, RoleController, RoleAssignController, AuthController, CurrencyController],
    providers:[UsersService,TransectionService, CruduserService, RoleAssignService,AuthService, JwtService,RolesGuard,CurrencyService,JwtStrategy],
    exports:[UsersService, TransectionService,RolesGuard]
    
})
export class AdminModule {}
