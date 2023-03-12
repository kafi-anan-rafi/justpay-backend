import { Injectable } from '@nestjs/common';
import { ReferEntity } from '../entities/refer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReferService {
  constructor(
    @InjectRepository(ReferEntity)
    private referRepository: Repository<ReferEntity>,
  ) { }

  referUser() {
    // return this.referRepository
  }

  referAgent() {

  }

  totalReferMoney(id: number) {
    return this.referRepository
  }

}
