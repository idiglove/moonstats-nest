export interface IResponse {
  success: boolean;
  message: string;
}

export type MarketPrice = {
  [key: string]: {
    usd: string;
  };
};

export type PnlItem = {
  id: string;
  unrealizedPnl: number;
  realizedPnl: number;
  unrealizedQuantity: number;
};
