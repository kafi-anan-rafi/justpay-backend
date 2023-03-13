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

  async getBalance(id: number) {
    // return await this.balanceRepository.findOneBy({ id })
    const balanceData = await this.balanceRepository.createQueryBuilder("balance")
      .where("balance.agent_id = :id", { id: id })
      .getOne()
    return balanceData.balance;
  }

  // getBalanceByEmail(email: string) {
  //   return this.balanceRepository.findOneBy({})
  // }

  addBalance(balanceDto: AddBalanceDto) {
    return this.balanceRepository.insert(balanceDto);
  }

  updateBalance(id: number, updateBalanceDto: UpdateBalanceDto) {
    return this.balanceRepository.update({ agent_id: id }, updateBalanceDto);
  }
}