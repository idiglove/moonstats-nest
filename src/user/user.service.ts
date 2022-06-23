import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { createTestUser } from './seed/create-test-user.seed';
import { IResponse } from 'src/types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly model: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.model.find().exec();
  }

  // async findAllByUser(userId: string, path: string): Promise<any> {
  //   const levels = await this.model
  //     .find({ levelUserId: userId, levelPath: path })
  //     .exec();
  //   return {
  //     levels: levels, // needed for Unity JSON serialization
  //   };
  // }

  async findOne(id: string): Promise<User> {
    return await this.model.findById(id).exec();
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User | BadRequestException> {
    try {
      const user = await new this.model({
        ...createUserDto,
        createdAt: new Date(),
      }).save();

      return user;
    } catch (e: any) {
      throw new BadRequestException({
        success: false,
        message: `There's an error - ${e?.message ?? ''}`,
      });
    }
  }

  async update(id: string, updateLevelDto: UpdateUserDto): Promise<User> {
    return await this.model.findByIdAndUpdate(id, updateLevelDto).exec();
  }

  async delete(id: string): Promise<User> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  async createFromSeed(): Promise<User | BadRequestException> {
    try {
      const testUser = await createTestUser();
      const user = await new this.model({
        ...testUser,
      }).save();

      return user;
    } catch (e: any) {
      throw new BadRequestException({
        success: false,
        message: `User seed creation error - ${e?.message ?? ''}`,
      });
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<IResponse | BadRequestException> {
    try {
      const user = await this.model.find({ email }).exec();

      if (!user.length) {
        throw new BadRequestException({
          success: false,
          message: `Email do not exist`,
        });
      }

      const userObj = user?.[0];

      const isMatch = await bcrypt.compare(password, userObj?.password);
      if (isMatch) {
        return {
          success: true,
          message: `Login success`,
          data: {
            id: userObj?.id,
            firstName: userObj?.firstName,
            lastName: userObj?.lastName,
            email: userObj?.email,
          },
        };
      }

      throw new BadRequestException({
        success: false,
        message: `Email and password do not match`,
      });
    } catch (e: any) {
      throw new BadRequestException({
        success: false,
        message: `Login error - ${e.message ?? ''}`,
      });
    }
  }
}
