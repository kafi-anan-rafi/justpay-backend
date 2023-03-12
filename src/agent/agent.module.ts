import { Module } from '@nestjs/common';
import { AgentController } from '../agent/agent.controller';
import { AgentService } from './services/agent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentEntity } from './entities/agent.entity';
import { ReferEntity } from './entities/refer.entity';
import { CashInEntity } from './entities/cashin.entity';
import { CashOutEntity } from './entities/cashout.entity';
import { TokenEntity } from './entities/token.entity';
import { WithdrawEntity } from './entities/withdraw.entity';
import { CashInService } from './services/cashin.service';
import { CashOutService } from './services/cashout.service';
import { OfferService } from './services/offer.service';
import { ReferService } from './services/refer.service';
import { TokenService } from './services/token.service';
import { WithdrawService } from './services/withdraw.service';
import { BonusService } from './services/bonus.service';
import { BonusEntity } from './entities/bonus.entity';
import { BalanceService } from './services/balance.service';
import { BalanceEntity } from './entities/balance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AgentEntity, BonusEntity, ReferEntity, CashInEntity, CashOutEntity, TokenEntity, WithdrawEntity, BalanceEntity])],
  controllers: [AgentController],
  providers: [AgentService, CashInService, CashOutService, OfferService, ReferService, TokenService, WithdrawService, BonusService, BalanceService],
})
export class AgentModule { }