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

    const totalPnl = spotOrders?.reduce((acc: number, curr: SpotOrder) => {
      const currTotal = curr?.totalAmount ?? 0;
      console.log('curr', { curr, acc });
      if (curr?.type === 'BUY') {
        return acc + currTotal;
      } else {
        return currTotal - acc;
      }
    }, 0);

    return {
      totalPnl,
    };
  }
}
