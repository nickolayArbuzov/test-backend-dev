import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../domain/user.schema';

@Injectable()
export class UserQueryRepo {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAllUsers() {
    const users = await this.userModel.find({isDeleted: false})
    return users
  }

  async findByLoginOrEmail(username: string) {
    return await this.userModel.findOne(
      {isDeleted: false, $or: [{"login": username}, {"email": username}]}
    )
  }

}