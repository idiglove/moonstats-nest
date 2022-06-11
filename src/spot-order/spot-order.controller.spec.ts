import { Test, TestingModule } from '@nestjs/testing';
import { SpotOrderController } from './spot-order.controller';

describe('SpotOrderController', () => {
  let controller: SpotOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpotOrderController],
    }).compile();

    controller = module.get<SpotOrderController>(SpotOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
