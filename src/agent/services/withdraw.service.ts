import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WithdrawDto } from '../dto/withdraw.dto';
import { WithdrawEntity } from '../entities/withdraw.entity';

@Injectable()
export class WithdrawService {
  constructor(
    @InjectRepository(WithdrawEntity)
    private withdrawRepository: Repository<WithdrawEntity>,
  ) { }

  withdraw(balance: number, dto,  amount: number) {
    if (balance < amount)
      return "Insufficient balance!"
    else {
      const amnt = this.withdrawRepository.create(dto);
      return this.withdrawRepository.save(amnt)
    }
  }
}
