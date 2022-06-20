import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoinGeckoModule } from 'src/coin-gecko/coin-gecko.module';
import {
  SpotOrder,
  SpotOrderSchema,
} from 'src/spot-order/schema/spot-order.schema';
import { UserPnlService } from './user-pnl.service';

@Module({
  providers: [UserPnlService],
  exports: [UserPnlService],
  imports: [
    CoinGeckoModule,
    MongooseModule.forFeature([
      {
        name: SpotOrder.name,
        schema: SpotOrderSchema,
      },
    ]),
  ],
})
export class UserPnlModule {}
