import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  createdAt: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  passwordSalt: string;

  @Prop({ required: true })
  isActivated: boolean;

  @Prop({ required: true })
  code: string;

  @Prop()
  friends: string[];

  @Prop()
  tokenDate: number;

  @Prop()
  rating: number;

  @Prop({ required: true })
  isDeleted: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);