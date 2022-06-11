import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    // MongoDB Connection
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.getMongoConfig(),
    }),
    ConfigModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
