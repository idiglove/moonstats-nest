import { Body, Controller, Post } from '@nestjs/common';
import { BinanceService } from './binance.service';
import { SymbolsDto } from './dto/symbols.dto';

@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Post('/my-trades')
  async getMyTrades(@Body() symbols: SymbolsDto) {
    return await this.binanceService.getMyTrades(symbols);
  }
}
