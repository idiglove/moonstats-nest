export interface IResponse {
  success: boolean;
  message: string;
  data?: any;
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
