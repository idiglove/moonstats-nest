import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SpotOrder } from './../spot-order/schema/spot-order.schema';
import { UserPnlService } from './user-pnl.service';
import {
  ordersRealizedMock,
  ordersUnrealizedMock,
} from './__mocks__/ordersPerCoin';

describe('UserPnlService', () => {
  let service: UserPnlService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPnlService,
        {
          provide: getModelToken(SpotOrder.name),
          useValue: Model, // <-- Use the Model Class from Mongoose
        },
      ],
    }).compile();
    service = module.get<UserPnlService>(UserPnlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should compute correct PNL', () => {
    const test = service.computePnl(ordersRealizedMock);
    const btc = test?.filter((val) => val?.id === 'BTC-USDT');
    expect(btc[0]?.realizedPnl).toBe(1.5);
    expect(btc[0]?.unrealizedPnl).toBe(0);
    expect(btc[0]?.unrealizedQuantity).toBe(0);
  });

  it('should compute correct unrealized PNL', () => {
    const test = service.computePnl(ordersUnrealizedMock);
    const btc = test?.filter((val) => val?.id === 'BTC-USDT');
    expect(btc[0]?.realizedPnl).toBe(0);
    expect(btc[0]?.unrealizedPnl).toBe(202.6);
    expect(btc[0]?.unrealizedQuantity).toBe(0.004);
  });
});
