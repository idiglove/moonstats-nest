import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { resolve } from 'path';
import { CoinGeckoService } from 'src/coin-gecko/coin-gecko.service';
import { PnlItem } from 'src/types';
import {
  SpotOrder,
  SpotOrderDocument,
} from './../spot-order/schema/spot-order.schema';

@Injectable()
export class UserPnlService {
  constructor(
    @InjectModel(SpotOrder.name)
    private readonly spotOrderModel: Model<SpotOrderDocument>,
    private readonly coinGeckoService: CoinGeckoService,
  ) {}

  computePnl(orders: any): PnlItem[] {
    return orders?.map((order) => {
      let unrealizedPnl = 0;
      let realizedPnl = 0;
      let unrealizedQuantity = 0;
      order?.items?.forEach((item: SpotOrder) => {
        if (item?.type === 'BUY') {
          unrealizedPnl += item?.totalAmount ?? 0;
          unrealizedQuantity += item?.quantity ?? 0;
        } else {
          realizedPnl += item?.totalAmount - unrealizedPnl;
          unrealizedQuantity -= item?.quantity;

          if (realizedPnl > 0) {
            unrealizedPnl = 0; // no more unrealized pnl
          }

          if (realizedPnl < 0) {
            realizedPnl = 0; // no realized pnl as of now
          }
        }
      });

      return {
        id: order?._id,
        unrealizedPnl,
        realizedPnl,
        unrealizedQuantity,
      };
    });
  }

  async computeTotalPnl(userId: string) {
    const ordersPerCoin = await this.spotOrderModel.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $sort: {
          createdAt: 1, // asc
        },
      },
      {
        $group: {
          _id: '$coinId',
          items: {
            $push: '$$ROOT',
          },
        },
      },
    ]);

    const coinPnl = this.computePnl(ordersPerCoin);
    let totalRealizedPnl = 0;
    let totalUnrealizedPnl = 0;
    let totalUnrealizedQuantity = 0;
    const mostHoldings = {
      symbol: '',
      coin: '',
      quantity: 0,
    };

    const totalPnl = await Promise.all(
      coinPnl?.map(async (coin: PnlItem) => {
        const existingCoin = await this.coinGeckoService.findById(coin?.id);
        const unrealizedPnl =
          coin.unrealizedQuantity * existingCoin?.marketPrice;
        totalRealizedPnl += coin?.realizedPnl;
        totalUnrealizedPnl += unrealizedPnl;
        totalUnrealizedQuantity += coin?.unrealizedQuantity;
        if (coin?.unrealizedQuantity > mostHoldings?.quantity) {
          mostHoldings.quantity = coin?.unrealizedQuantity;
          mostHoldings.coin = coin?.id;
          mostHoldings.symbol = existingCoin?.symbol;
        }
        return {
          ...coin,
          symbol: existingCoin?.symbol,
          unrealizedPnl,
        };
      }),
    );

    return {
      totalPnl,
      totalRealizedPnl,
      totalUnrealizedPnl,
      totalUnrealizedQuantity,
      mostHoldings,
    };
  }
}
