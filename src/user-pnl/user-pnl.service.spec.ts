import { Test, TestingModule } from '@nestjs/testing';
import { UserPnlService } from './user-pnl.service';

describe('UserPnlService', () => {
  let service: UserPnlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPnlService],
    }).compile();

    service = module.get<UserPnlService>(UserPnlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
