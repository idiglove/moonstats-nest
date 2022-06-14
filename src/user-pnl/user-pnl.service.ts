import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SpotOrder,
  SpotOrderDocument,
} from './../spot-order/schema/spot-order.schema';

@Injectable()
export class UserPnlService {
  constructor(
    @InjectModel(SpotOrder.name)
    private readonly spotOrderModel: Model<SpotOrderDocument>,
  ) {}

  async computeTotalPnl(userId: string) {
    const totalBuyAndSell = await this.spotOrderModel.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $group: {
          _id: '$type',
          sum: {
            $sum: '$totalAmount',
          },
        },
      },
    ]);

    const buyAndSellQuantity = await this.spotOrderModel.aggregate([
      {
        $group: {
          _id: {
            type: '$type',
            pair: '$symbolPair',
          },
          quantity: {
            $sum: '$quantity',
          },
        },
      },
    ]);

    console.log({ buyAndSellQuantity });

    const buyTotal =
      totalBuyAndSell?.filter((total) => total?._id === 'BUY')?.[0]?.sum ?? 0;
    const sellTotal =
      totalBuyAndSell?.filter((total) => total?._id === 'SELL')?.[0]?.sum ?? 0;
    const totalPnl = sellTotal - buyTotal;

    return {
      totalPnl,
      totalBuyAndSell,
    };
  }
}
