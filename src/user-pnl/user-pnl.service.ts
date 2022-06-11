import { SpotOrder } from './../spot-order/schema/spot-order.schema';

export class UserPnlService {
  spotOrders: SpotOrder[];

  constructor(spotOrders: SpotOrder[]) {
    this.spotOrders = spotOrders;
  }

  computeTotalPnl(userId: string) {
    return {
      test: 12321,
    };
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
