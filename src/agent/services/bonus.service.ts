import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BonusEntity } from '../entities/bonus.entity';
import { BonusDto } from '../dto/bonus.dto';

@Injectable()
export class BonusService {
  constructor(
    @InjectRepository(BonusEntity)
    private bonusRepository: Repository<BonusEntity>,
  ) { }

  // no sure about the logic
  cashInBonus(amount: BonusDto) {
    return this.bonusRepository.save(amount)
  }

  cashOutBonus(amount: BonusDto) {
    return this.bonusRepository.save(amount)
  }

  // incomplete
  totalBonusMoney(id: number) {
    return this.bonusRepository.createQueryBuilder('bonus')
  }
}