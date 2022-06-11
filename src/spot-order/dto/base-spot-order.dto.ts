export class BaseSpotOrderDto {
  userId: string;
  symbolPair: string; // BTC-USDT
  type: string; // buy / sell
  pricePerCoin: number;
  quantity: number;
  totalAmount: number;
}
