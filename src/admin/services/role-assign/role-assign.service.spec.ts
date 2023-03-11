import { Test, TestingModule } from '@nestjs/testing';
import { RoleAssignService } from './role-assign.service';

describe('RoleAssignService', () => {
  let service: RoleAssignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleAssignService],
    }).compile();

    service = module.get<RoleAssignService>(RoleAssignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
