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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index() {
    return await this.userService.findAll();
  }

  @Get(':id') // user/628a1d220d6613d63b8b024f
  async find(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  // @Get('user/:userId/path/:path')
  // async findByUserIdAndPath(
  //   @Param('userId') userId: string,
  //   @Param('path') path: string,
  // ) {
  //   return await this.userService.findAllByUser(userId, path);
  // }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
