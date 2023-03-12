import { Injectable } from '@nestjs/common';
import { CreateHelptokenDto } from './dto/create-helptoken.dto';
import { UpdateHelptokenDto } from './dto/update-helptoken.dto';

@Injectable()
export class HelptokenService {
  create(createHelptokenDto: CreateHelptokenDto) {
    return 'This action adds a new helptoken';
  }

  findAll() {
    return `This action returns all helptoken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} helptoken`;
  }

  update(id: number, updateHelptokenDto: UpdateHelptokenDto) {
    return `This action updates a #${id} helptoken`;
  }

  remove(id: number) {
    return `This action removes a #${id} helptoken`;
  }
}
