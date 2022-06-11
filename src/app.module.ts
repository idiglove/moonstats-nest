import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { SpotOrderModule } from './spot-order/spot-order.module';
import { UserModule } from './user/user.module';
import { UserPnlService } from './user-pnl/user-pnl.service';
import { UserPnlModule } from './user-pnl/user-pnl.module';

@Module({
  imports: [
    // MongoDB Connection
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.getMongoConfig(),
    }),
    ConfigModule,
    SpotOrderModule,
    UserModule,
    UserPnlModule,
  ],
  providers: [ConfigService, UserPnlService],
})
export class AppModule {}
