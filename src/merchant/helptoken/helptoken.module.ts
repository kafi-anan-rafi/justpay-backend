import { Module } from '@nestjs/common';
import { HelptokenService } from './helptoken.service';
import { HelptokenController } from './helptoken.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Helptoken } from './entities/helptoken.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Helptoken])],
  controllers: [HelptokenController],
  providers: [HelptokenService]
})
export class HelptokenModule {}
