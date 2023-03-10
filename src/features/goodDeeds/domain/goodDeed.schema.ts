import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/domain/user.schema';

export type GoodDeedDocument = HydratedDocument<GoodDeed>;

@Schema()
export class GoodDeed {

  @Prop({ required: true })
  userId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  createdAt: string;

  @Prop()
  updatedAt: string;

  @Prop({ required: true })
  isDone: boolean;

  @Prop({ required: true })
  isDeleted: boolean;

}

export const GoodDeedSchema = SchemaFactory.createForClass(GoodDeed);