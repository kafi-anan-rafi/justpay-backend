import { Test, TestingModule } from '@nestjs/testing';
import { RoleAssignController } from './role-assign.controller';

describe('RoleAssignController', () => {
  let controller: RoleAssignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleAssignController],
    }).compile();

    controller = module.get<RoleAssignController>(RoleAssignController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
