import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPnlService } from './../user-pnl/user-pnl.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userPnlService: UserPnlService,
  ) {}

  @Get()
  async index() {
    return await this.userService.findAll();
  }

  @Get('id/:id') // user/628a1d220d6613d63b8b024f
  async find(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Get('pnl/id/:userId') // pnl/id/628a1d220d6613d63b8b024f
  async getPnl(@Param('userId') userId: string) {
    return await this.userPnlService.computeTotalPnl(userId);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Post('/login')
  async login(@Body() createUserDto: CreateUserDto) {
    return await this.userService.login(
      createUserDto.email,
      createUserDto.password,
    );
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }

  //createFromSeed
  @Get('/seed')
  async createFromSeed() {
    return await this.userService.createFromSeed();
  }
}
