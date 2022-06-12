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
    const spotOrders = await this.spotOrderModel.find({ userId }).exec();

    const totalPnl = spotOrders?.reduce(
      (acc: any, curr: SpotOrder) => {
        const currTotal = curr?.totalAmount ?? 0;
        const buy = acc?.buy ?? 0;
        const sell = acc?.sell ?? 0;
        if (curr?.type === 'BUY') {
          return {
            ...acc,
            buy: buy + currTotal,
          };
        } else {
          return {
            ...acc,
            sell: sell + currTotal,
          };
        }
      },
      {
        buy: 0,
        sell: 0,
      },
    );

    totalPnl['total'] = totalPnl.sell - totalPnl.buy;

    return {
      totalPnl,
    };
  }
}
