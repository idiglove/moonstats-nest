import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CoinDocument = Coin & Document;

@Schema()
export class Coin {
  @Prop({ required: true })
  id: string;

  @Prop()
  symbol: string;

  @Prop()
  name: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CoinSchema = SchemaFactory.createForClass(Coin);
