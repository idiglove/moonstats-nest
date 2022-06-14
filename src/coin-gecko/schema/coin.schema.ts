import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CoinDocument = Coin & Document;

@Schema()
export class Coin {
  @Prop({ required: true })
  id: string; //coinId in SpotOrder

  @Prop()
  symbol: string;

  @Prop()
  name: string;

  @Prop()
  marketPrice: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CoinSchema = SchemaFactory.createForClass(Coin);
