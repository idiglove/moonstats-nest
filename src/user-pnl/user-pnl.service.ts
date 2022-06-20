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
            unrealizedPnl = 0;
          }

          if (realizedPnl < 0) {
            realizedPnl = 0;
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

    const coinsWithPrice = await Promise.all(
      coinPnl?.map(async (coin: PnlItem) => {
        const existingCoin = await this.coinGeckoService.findById(coin?.id);
        console.log({ coin, existingCoin });
        return {
          ...coin,
          unrealizedPnl: coin.unrealizedQuantity * existingCoin?.marketPrice,
        };
      }),
    );

    // const buyAndSellQuantity = await this.spotOrderModel.aggregate([
    //   {
    //     $group: {
    //       _id: {
    //         type: '$type',
    //         pair: '$symbolPair',
    //       },
    //       quantity: {
    //         $sum: '$quantity',
    //       },
    //     },
    //   },
    // ]);

    // console.log({
    //   ordersPerCoin,
    //   coinPnl: JSON.stringify(coinPnl),
    //   coinWithPrice: JSON.stringify(coinsWithPrice),
    // });

    // const buyTotal =
    //   totalBuyAndSell?.filter((total) => total?._id === 'BUY')?.[0]?.sum ?? 0;
    // const sellTotal =
    //   totalBuyAndSell?.filter((total) => total?._id === 'SELL')?.[0]?.sum ?? 0;
    // const totalPnl = sellTotal - buyTotal;

    return {
      coinsWithPrice,
      // test: '12',
      // totalPnl,
      // totalBuyAndSell,
    };
  }
}
