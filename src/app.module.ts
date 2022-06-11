import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { SpotOrderModule } from './spot-order/spot-order.module';
import { UserModule } from './user/user.module';

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
  ],
  providers: [ConfigService],
})
export class AppModule {}
