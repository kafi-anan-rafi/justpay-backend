import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/admin/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleAssignService {
    constructor(
        @InjectRepository(UserEntity)
        private clientRepo: Repository<UserEntity>,
      ) {}

      async createRole(id: number) {
        const useraccount = await this.clientRepo.findOneBy({id});
        if (!useraccount) {
          throw new NotFoundException(`User with id ${id} not found.`);
        }
        await this.clientRepo.update({ id }, { createStatus: true });
      }

      async deleteRole(id: number) {
        const useraccount = await this.clientRepo.findOneBy({id});
        if (!useraccount) {
          throw new NotFoundException(`User with id ${id} not found.`);
        }
        await this.clientRepo.update({ id }, { deleteStatus: true });
      }

      async updateRole(id: number) {
        const useraccount = await this.clientRepo.findOneBy({id});
        if (!useraccount) {
          throw new NotFoundException(`User with id ${id} not found.`);
        }
        await this.clientRepo.update({ id }, { updateStatus: true });
      }
}
