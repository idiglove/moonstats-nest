import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schema/user.schema';
import { UserPnlModule } from 'src/user-pnl/user-pnl.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
  imports: [
    UserPnlModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
})
export class UserModule {}
