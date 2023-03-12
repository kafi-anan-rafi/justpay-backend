import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CashInEntity } from '../entities/cashin.entity';
import { CashInDto } from '../dto/cash-in.dto';

@Injectable()
export class CashInService {
  constructor(
    @InjectRepository(CashInEntity)
    private transactionRepository: Repository<CashInEntity>,
  ) { }

  cashIn(amount: CashInDto) {
    return this.transactionRepository.save(amount);
  }
}