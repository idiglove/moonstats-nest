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
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';

@Controller('coin-gecko')
export class CoinGeckoController {
  constructor(private readonly coinGeckoService: CoinGeckoService) {}

  @Get()
  async index() {
    return await this.coinGeckoService.findAll();
  }

  @Get('id/:id') // user/628a1d220d6613d63b8b024f
  async find(@Param('id') id: string) {
    return await this.coinGeckoService.findOne(id);
  }

  @Post('/save')
  async saveCoins() {
    return await this.coinGeckoService.getAndSaveList();
  }

  // @Get('pnl/id/:userId') // pnl/id/628a1d220d6613d63b8b024f
  // async getPnl(@Param('userId') userId: string) {
  //   return await this.coinGeckoService.computeTotalPnl(userId);
  // }

  // @Get('user/:userId/path/:path')
  // async findByUserIdAndPath(
  //   @Param('userId') userId: string,
  //   @Param('path') path: string,
  // ) {
  //   return await this.coinGeckoService.findAllByUser(userId, path);
  // }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateCoinDto) {
    return await this.coinGeckoService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.coinGeckoService.delete(id);
  }
}
