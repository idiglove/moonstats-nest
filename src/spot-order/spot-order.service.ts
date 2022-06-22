import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import fetch from 'cross-fetch';

import { CreateSpotOrderDto } from './dto/create-spot-order.dto';
import { UpdateSpotOrderDto } from './dto/update-spot-order.dto';
import { CoinGeckoService } from './../coin-gecko/coin-gecko.service';
import { SpotOrder, SpotOrderDocument } from './schema/spot-order.schema';
import { IResponse, MarketPrice } from 'src/types';
import { createSpotOrdersForTestUser } from './seed/create-for-test-user.seed';

@Injectable()
export class SpotOrderService {
  constructor(
    @InjectModel(SpotOrder.name)
    private readonly model: Model<SpotOrderDocument>,
    private readonly coinGeckoService: CoinGeckoService,
  ) {}

  async findAll(): Promise<SpotOrder[]> {
    return await this.model.find().exec();
  }

  async findAllByUser(userId: string): Promise<any> {
    const spotOrders = await this.model.find({ userId }).exec();
    return spotOrders;
  }

  async findOne(id: string): Promise<SpotOrder> {
    return await this.model.findById(id).exec();
  }

  async create(createSpotOrderDto: CreateSpotOrderDto): Promise<any> {
    try {
      const id = createSpotOrderDto.coinId;
      const existingCoin = await this.coinGeckoService.findById(id);
      let marketPrice: MarketPrice;

      if (
        existingCoin.marketPrice === null ||
        existingCoin.marketPrice === undefined
      ) {
        // if marketPrice hasnt been saved for this coin, save the price
        const marketPriceRes = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`,
        );
        marketPrice = await marketPriceRes.json();

        await this.coinGeckoService.updateByCoinId(id, {
          id,
          marketPrice: marketPrice[id]?.usd
            ? parseInt(marketPrice[id]?.usd)
            : 0,
          updatedAt: new Date(),
        });
      }

      const spotOrder = await new this.model({
        ...createSpotOrderDto,
        totalAmount:
          createSpotOrderDto.pricePerCoin * createSpotOrderDto.quantity,
        createdAt: new Date(),
      }).save();

      return { spotOrder, marketPrice };
    } catch (e: any) {
      throw new BadRequestException({
        success: false,
        message: `There's an error - ${e?.message ?? ''}`,
      });
    }
  }

  async getGroupedByDate(userId: string): Promise<any> {
    const spotOrders = await this.model
      .aggregate([
        {
          $match: {
            userId,
          },
        },
        {
          $group: {
            _id: {
              day: {
                $dayOfMonth: '$createdAt',
              },
              month: {
                $month: '$createdAt',
              },
              year: {
                $year: '$createdAt',
              },
            },
            items: {
              $push: '$$ROOT',
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ])
      .exec();
    return spotOrders;
  }

  async update(
    id: string,
    updateLevelDto: UpdateSpotOrderDto,
  ): Promise<SpotOrder> {
    return await this.model.findByIdAndUpdate(id, updateLevelDto).exec();
  }

  async delete(id: string): Promise<SpotOrder> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  async createSpotOrdersForTestUser(
    userId: string,
  ): Promise<IResponse | BadRequestException> {
    try {
      await this.model.insertMany(createSpotOrdersForTestUser(userId));
      return {
        success: true,
        message: 'Succesfully seeded Spot Orders',
      };
    } catch (e: any) {
      throw new BadRequestException({
        success: false,
        message: `There's an error - ${e?.message ?? ''}`,
      });
    }
  }
}
