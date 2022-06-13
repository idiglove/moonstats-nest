import { Test, TestingModule } from '@nestjs/testing';
import { CoinGeckoController } from './coin-gecko.controller';

describe('CoinGeckoController', () => {
  let controller: CoinGeckoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoinGeckoController],
    }).compile();

    controller = module.get<CoinGeckoController>(CoinGeckoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
