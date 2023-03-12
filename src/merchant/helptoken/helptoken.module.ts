import { Module } from '@nestjs/common';
import { HelptokenService } from './helptoken.service';
import { HelptokenController } from './helptoken.controller';

@Module({
  controllers: [HelptokenController],
  providers: [HelptokenService]
})
export class HelptokenModule {}
