import { CreateSpotOrderDto } from './../dto/create-spot-order.dto';

export const createSpotOrdersForTestUser = (userId: string) => {
  const spotOrders: CreateSpotOrderDto[] = [
    // bitcoin
    {
      userId,
      symbolPair: 'BTC-USDT',
      coinId: 'bitcoin',
      type: 'BUY',
      pricePerCoin: 25000,
      quantity: 0.002,
      totalAmount: 50,
      createdAt: new Date('2022-05-02'),
    },
    {
      userId,
      symbolPair: 'BTC-USDT',
      coinId: 'bitcoin',
      type: 'BUY',
      pricePerCoin: 26000,
      quantity: 0.002,
      totalAmount: 52,
      createdAt: new Date('2022-05-03'),
    },
    {
      userId,
      symbolPair: 'BTC-USDT',
      coinId: 'bitcoin',
      type: 'SELL',
      pricePerCoin: 27000,
      quantity: 0.002,
      totalAmount: 54,
      createdAt: new Date('2022-05-04'),
    },
    // ada cardano
    {
      userId,
      symbolPair: 'ADA-USDT',
      coinId: 'cardano',
      type: 'BUY',
      pricePerCoin: 0.4,
      quantity: 100,
      totalAmount: 40,
      createdAt: new Date('2022-05-03'),
    },
    {
      userId,
      symbolPair: 'ADA-USDT',
      coinId: 'cardano',
      type: 'SELL',
      pricePerCoin: 0.5,
      quantity: 100,
      totalAmount: 50,
      createdAt: new Date('2022-05-04'),
    },
    // knc kyber
    {
      userId,
      symbolPair: 'KNC-USDT',
      coinId: 'kyber-network-crystal',
      type: 'BUY',
      pricePerCoin: 1.9,
      quantity: 50,
      totalAmount: 95,
      createdAt: new Date('2022-05-04'),
    },
    {
      userId,
      symbolPair: 'KNC-USDT',
      coinId: 'kyber-network-crystal',
      type: 'SELL',
      pricePerCoin: 2,
      quantity: 100,
      totalAmount: 100,
      createdAt: new Date('2022-05-05'),
    },
  ];

  return spotOrders;
};
