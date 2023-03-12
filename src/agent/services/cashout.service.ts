import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CashOutEntity } from '../entities/cashout.entity';
import { CashOutDto } from '../dto/cash-out.dto';

@Injectable()
export class CashOutService {
  constructor(
    @InjectRepository(CashOutEntity)
    private transactionRepository: Repository<CashOutEntity>,
  ) { }

  cashOut(amount: CashOutDto) {
    return this.transactionRepository.save(amount);
  }
}