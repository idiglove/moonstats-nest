import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CoinGeckoService } from './coin-gecko.service';
import { UpdateCoinDto } from './dto/update-coin.dto';

@Controller('coin-gecko')
export class CoinGeckoController {
  constructor(private readonly coinGeckoService: CoinGeckoService) {}

  @Get()
  async index() {
    return await this.coinGeckoService.findAll();
  }

  @Get('/symbol/:symbol')
  async findBySymbol(@Param('symbol') symbol: string) {
    return await this.coinGeckoService.findBySymbol(symbol);
  }

  @Get('id/:id') // user/628a1d220d6613d63b8b024f
  async find(@Param('id') id: string) {
    return await this.coinGeckoService.findOne(id);
  }

  @Post('/save')
  async saveCoins() {
    return await this.coinGeckoService.getAndSaveList();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateCoinDto) {
    return await this.coinGeckoService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.coinGeckoService.delete(id);
  }
}
