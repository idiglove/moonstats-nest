export const ordersRealizedMock = [
  {
    _id: 'BTC-USDT',
    items: [
      {
        userId: 'test',
        symbolPair: 'BTC-USDT',
        type: 'BUY',
        pricePerCoin: 29000,
        quantity: 0.003,
        totalAmount: 87,
      },
      {
        userId: 'test',
        symbolPair: 'BTC-USDT',
        type: 'SELL',
        pricePerCoin: 29500,
        quantity: 0.003,
        totalAmount: 88.5,
      },
    ],
  },
];

export const ordersUnrealizedMock = [
  {
    _id: 'BTC-USDT',
    items: [
      {
        userId: 'test',
        symbolPair: 'BTC-USDT',
        coinId: 'bitcoin',
        type: 'BUY',
        pricePerCoin: 29000,
        quantity: 0.003,
        totalAmount: 87,
      },
      {
        userId: 'test',
        symbolPair: 'BTC-USDT',
        coinId: 'bitcoin',
        type: 'BUY',
        pricePerCoin: 28900,
        quantity: 0.004,
        totalAmount: 115.6,
      },
      {
        userId: 'test',
        symbolPair: 'BTC-USDT',
        coinId: 'bitcoin',
        type: 'SELL',
        pricePerCoin: 29500,
        quantity: 0.003,
        totalAmount: 88.5,
      },
    ],
  },
];
