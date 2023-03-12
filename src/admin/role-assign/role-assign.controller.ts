import { Controller, Param, Post, Put } from '@nestjs/common';
import { RoleAssignService } from '../services/role-assign/role-assign.service';

@Controller('roleAssign')
export class RoleAssignController {
    constructor(private readonly roleAssignService: RoleAssignService,) {}

    @Post(':id/view')
    async createrole(@Param('id') id: number) {
    await this.roleAssignService.createRole(id);
    return'View role assigned sucessfuly!';
  }

  @Put(':id/update')
    async updaterole(@Param('id') id: number) {
    await this.roleAssignService.updateRole(id);
    return'Role assigned sucessfuly!';
  }

  @Put(':id/delete')
    async deleterole(@Param('id') id: number) {
    await this.roleAssignService.deleteRole(id);
    return'Role assigned sucessfuly!';
  }


}
