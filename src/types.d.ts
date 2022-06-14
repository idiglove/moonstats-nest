export interface IResponse {
  success: boolean;
  message: string;
}

export type MarketPrice = {
  [key: string]: {
    usd: string;
  };
};
