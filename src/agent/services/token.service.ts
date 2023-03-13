import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddTokenDto } from '../dto/add-token.dto';
import { UpdateTokenDto } from '../dto/update-token.dto';
import { TokenEntity } from '../entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>
  ) { }

  getAllToken(agent_id: any) {
    // return this.tokenRepository.createQueryBuilder("token")
    //   .where("token.agent_id = :id", { id: agent_id })
    //   .getMany()
    return this.tokenRepository.find()
  }

  addToken(addTokenDto) {
    const token = this.tokenRepository.create(addTokenDto)
    return this.tokenRepository.save(token);
  }

  updateToken(id: number, updateTokenDto) {
    return this.tokenRepository.update(id, updateTokenDto);
  }

  deleteToken(id: number) {
    return this.tokenRepository.delete(id);
  }
}