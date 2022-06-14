export class BaseSpotOrderDto {
  userId: string;
  symbolPair: string; // BTC-USDT
  type: string; // buy / sell
  coinId: string; // from coin gecko
  pricePerCoin: number;
  quantity: number;
  totalAmount: number;
}
