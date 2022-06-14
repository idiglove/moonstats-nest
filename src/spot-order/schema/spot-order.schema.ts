import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SpotOrderDocument = SpotOrder & Document;

@Schema()
export class SpotOrder {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  symbolPair: string;

  @Prop({ required: true })
  coinId: string; // id in Coin

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  pricePerCoin: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  totalAmount: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const SpotOrderSchema = SchemaFactory.createForClass(SpotOrder);
