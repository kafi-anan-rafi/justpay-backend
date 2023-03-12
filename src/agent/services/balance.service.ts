import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BalanceEntity } from '../entities/balance.entity';
import { UpdateBalanceDto } from '../dto/update-balance.dto';
import { AddBalanceDto } from '../dto/add-balance.dto';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(BalanceEntity)
    private balanceRepository: Repository<BalanceEntity>,
  ) { }

  getBalance(id: number) {
    return this.balanceRepository.createQueryBuilder("agent")
      .where("agent.id = :id", { id: id })
      .getOne()
  }
  
  addBalance(balanceDto: AddBalanceDto) {
    return this.balanceRepository.insert(balanceDto);
  }

  updateBalance(id: number, updateBalanceDto: UpdateBalanceDto) {
    return this.balanceRepository.update({ agent_id: id }, updateBalanceDto);
  }
}