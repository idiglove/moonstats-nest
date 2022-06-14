import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoinGeckoController } from './coin-gecko.controller';
import { CoinGeckoService } from './coin-gecko.service';
import { Coin, CoinSchema } from './schema/coin.schema';

@Module({
  controllers: [CoinGeckoController],
  providers: [CoinGeckoService],
  exports: [CoinGeckoService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Coin.name,
        schema: CoinSchema,
      },
    ]),
  ],
})
export class CoinGeckoModule {}
