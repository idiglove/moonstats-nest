import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SpotOrderService } from './spot-order.service';
import { CreateSpotOrderDto } from './dto/create-spot-order.dto';
import { UpdateSpotOrderDto } from './dto/update-spot-order.dto';

@Controller('spot-order')
export class SpotOrderController {
  constructor(private readonly spotOrderService: SpotOrderService) {}

  @Get()
  async index() {
    return await this.spotOrderService.findAll();
  }

  @Get('id/:id') // spot-order/628a1d220d6613d63b8b024f
  async find(@Param('id') id: string) {
    return await this.spotOrderService.findOne(id);
  }

  @Get('date-grouped/user/:userId')
  async getGroupedByDate(@Param('userId') userId: string) {
    return await this.spotOrderService.getGroupedByDate(userId);
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    return await this.spotOrderService.findAllByUser(userId);
  }

  @Post()
  async create(@Body() createSpotOrderDto: CreateSpotOrderDto) {
    return await this.spotOrderService.create(createSpotOrderDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLevelDto: UpdateSpotOrderDto,
  ) {
    return await this.spotOrderService.update(id, updateLevelDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.spotOrderService.delete(id);
  }

  @Get('seed/user/:userId')
  async createSeedsByUser(@Param('userId') userId: string) {
    return await this.spotOrderService.createSpotOrdersForTestUser(userId);
  }
}
