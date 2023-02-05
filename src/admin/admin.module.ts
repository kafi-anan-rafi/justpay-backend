import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';

@Module({
    imports:[],
    controllers:[],
    providers:[UsersService],
    exports:[UsersService]
})
export class AdminModule {}
