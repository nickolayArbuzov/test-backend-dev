import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/domain/user.schema';
import { GoodDeed } from '../../goodDeeds/domain/goodDeed.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {

  @Prop({ required: true })
  goodDeedId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  userId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  createdAt: string;

  @Prop()
  updatedAt: string;

  @Prop({ required: true })
  isDeleted: boolean;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);