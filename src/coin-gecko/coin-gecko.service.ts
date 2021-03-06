import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import fetch from 'cross-fetch';

import { IResponse } from './../types.d';
import { UpdateCoinDto } from './dto/update-coin.dto';
import { Coin, CoinDocument } from './schema/coin.schema';

@Injectable()
export class CoinGeckoService {
  constructor(
    @InjectModel(Coin.name)
    private readonly model: Model<CoinDocument>,
  ) {}

  async findAll(): Promise<Coin[]> {
    return await this.model.find().exec();
  }

  // id here is ObjectId
  async findOne(id: string): Promise<Coin> {
    return await this.model.findById(id).exec();
  }

  async findBySymbol(symbol: string): Promise<Coin[]> {
    const regex = new RegExp('^' + symbol);
    return await this.model.find({ symbol: regex }).exec();
  }

  async findById(id: string): Promise<Coin> {
    return await this.model.findOne({ id }).exec();
  }

  async getAndSaveList(): Promise<IResponse | BadRequestException> {
    try {
      const coinsRes = await fetch(
        'https://api.coingecko.com/api/v3/coins/list?include_platform=false',
      );
      const coins = await coinsRes.json();

      await this.model.insertMany(coins);

      return {
        success: true,
        message: 'Succesfully saved coins list from Coin Gecko',
      };
    } catch (e: any) {
      throw new BadRequestException({
        success: false,
        message: `There's an error - ${e?.message ?? ''}`,
      });
    }
  }

  async updateByCoinId(
    coinId: string,
    updateLevelDto: UpdateCoinDto,
  ): Promise<any> {
    return await this.model.find({ id: coinId }).update(updateLevelDto).exec();
  }

  // id is ObjectId
  async update(id: string, updateLevelDto: UpdateCoinDto): Promise<Coin> {
    return await this.model.findByIdAndUpdate(id, updateLevelDto).exec();
  }

  async delete(id: string): Promise<Coin> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
