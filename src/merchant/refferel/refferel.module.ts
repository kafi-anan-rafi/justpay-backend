import { Module } from '@nestjs/common';
import { RefferelService } from './refferel.service';
import { RefferelController } from './refferel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Refferel } from './entities/refferel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Refferel])],
  controllers: [RefferelController],
  providers: [RefferelService]
})
export class RefferelModule {}
