import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSpotOrderDto } from './dto/create-spot-order.dto';
import { UpdateSpotOrderDto } from './dto/update-spot-order.dto';
import { SpotOrder, SpotOrderDocument } from './schema/spot-order.schema';

@Injectable()
export class SpotOrderService {
  constructor(
    @InjectModel(SpotOrder.name)
    private readonly model: Model<SpotOrderDocument>,
  ) {}

  async findAll(): Promise<SpotOrder[]> {
    return await this.model.find().exec();
  }

  async findAllByUser(userId: string, path: string): Promise<any> {
    const levels = await this.model
      .find({ levelUserId: userId, levelPath: path })
      .exec();
    return {
      levels: levels, // needed for Unity JSON serialization
    };
  }

  async findOne(id: string): Promise<SpotOrder> {
    return await this.model.findById(id).exec();
  }

  async create(
    createSpotOrderDto: CreateSpotOrderDto,
  ): Promise<SpotOrder | BadRequestException> {
    try {
      const spotOrder = await new this.model({
        ...createSpotOrderDto,
        createdAt: new Date(),
      }).save();

      return spotOrder;
    } catch (e: any) {
      throw new BadRequestException({
        success: false,
        message: `There's an error - ${e?.message ?? ''}`,
      });
    }
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
}
