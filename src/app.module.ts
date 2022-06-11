import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { SpotOrderModule } from './spot-order/spot-order.module';

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
  ],
  providers: [ConfigService],
})
export class AppModule {}
