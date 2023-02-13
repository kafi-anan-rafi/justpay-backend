import { Test, TestingModule } from '@nestjs/testing';
import { CruduserService } from './cruduser.service';

describe('CruduserService', () => {
  let service: CruduserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CruduserService],
    }).compile();

    service = module.get<CruduserService>(CruduserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
