import { Injectable } from '@nestjs/common';
import { CreateRefferelDto } from './dto/create-refferel.dto';
import { UpdateRefferelDto } from './dto/update-refferel.dto';

@Injectable()
export class RefferelService {
  create(createRefferelDto: CreateRefferelDto) {
    return 'This action adds a new refferel';
  }

  findAll() {
    return `This action returns all refferel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} refferel`;
  }

  update(id: number, updateRefferelDto: UpdateRefferelDto) {
    return `This action updates a #${id} refferel`;
  }

  remove(id: number) {
    return `This action removes a #${id} refferel`;
  }
}
