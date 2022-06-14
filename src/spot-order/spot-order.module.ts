import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpotOrderService } from './spot-order.service';
import { SpotOrderController } from './spot-order.controller';
import { CoinGeckoModule } from './../coin-gecko/coin-gecko.module';
import { SpotOrder, SpotOrderSchema } from './schema/spot-order.schema';

@Module({
  providers: [SpotOrderService],
  controllers: [SpotOrderController],
  exports: [
    SpotOrderService,
    MongooseModule.forFeature([
      {
        name: SpotOrder.name,
        schema: SpotOrderSchema,
      },
    ]),
  ],
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
export class SpotOrderModule {}
