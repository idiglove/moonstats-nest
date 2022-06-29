import { BadRequestException, Injectable } from '@nestjs/common';
import { IResponse } from './../types.d';
import { Spot } from '@binance/connector';
import { SymbolsDto } from './dto/symbols.dto';

@Injectable()
export class BinanceService {
  async getMyTrades(
    symbols: SymbolsDto,
  ): Promise<IResponse | BadRequestException> {
    try {
      const apiKey =
        'q2MQogBALjYpgNeYIsnzDurHvNatZfFIy6u4p2hG8u6EiquiP09stR66wGBLleMB';
      const apiSecret =
        '0ZgntIg8TA35t8T0eOK7gW1veMitJQhE4WBUm4DGkcnB4rTWO9WraclXaCxT9tQH';
      const client = new Spot(apiKey, apiSecret);

      // const trade = await client.myTrades(symbols.symbols[0]);
      const trades = await Promise.all(
        symbols.symbols.map(async (symbol) => {
          const trade = await client.myTrades(symbol);
          return trade?.data;
        }),
      );

      return {
        success: true,
        message: 'Fetch Trade success',
        data: trades,
      };
    } catch (e: any) {
      throw new BadRequestException({
        success: false,
        message: `Fetch Trade error - ${e?.message ?? ''}`,
      });
    }
  }
}
