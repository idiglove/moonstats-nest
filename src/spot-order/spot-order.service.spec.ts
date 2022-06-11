import { Test, TestingModule } from '@nestjs/testing';
import { SpotOrderService } from './spot-order.service';

describe('SpotOrderService', () => {
  let service: SpotOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpotOrderService],
    }).compile();

    service = module.get<SpotOrderService>(SpotOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
