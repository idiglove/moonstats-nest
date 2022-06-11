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
    // return {
    //   test: 1212,
    // };
    // console.log('userId', { userId });
    const spotOrders = await this.spotOrderModel.find({ userId }).exec();
    return {
      test: spotOrders,
    };
    //todo: compute pnl and userId should be the id, check that

    // const totalPnl = this.spotOrders?.reduce((acc: number, curr: SpotOrder) => {
    //   const currTotal = curr?.totalAmount ?? 0;
    //   if (curr?.type === 'BUY') {
    //     return acc + currTotal;
    //   } else {
    //     return acc - currTotal;
    //   }
    // }, 0);

    // return totalPnl;
  }
}
