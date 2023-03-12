import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OfferService {
  constructor(
    // @InjectRepository(ReferEntity)
    // private agentRepository: Repository<ReferEntity>,
  ) { }

  offer() {
    return 'Offer!'
  }
}
