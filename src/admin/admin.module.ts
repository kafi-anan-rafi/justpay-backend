import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientEntity } from './client.entity';
import { CrudController } from './controllers/admin/crud.controller';
import { CruduserService } from './services/cruduser/cruduser.service';
import { TransectionService } from './services/transection/transection.service';
import { UsersService } from './services/users/users.service';
import { TransectionEntity } from './transection.entity';
import { TransectionController } from './transection/transection.controller';

@Module({
    imports:[TypeOrmModule.forFeature([ClientEntity, TransectionEntity])],
    controllers:[CrudController, TransectionController],
    providers:[UsersService,TransectionService, CruduserService],
    exports:[UsersService, TransectionService]
    
})
export class AdminModule {}
