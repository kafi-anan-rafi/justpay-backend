import { Module } from '@nestjs/common';
import { RefferelService } from './refferel.service';
import { RefferelController } from './refferel.controller';

@Module({
  controllers: [RefferelController],
  providers: [RefferelService]
})
export class RefferelModule {}
