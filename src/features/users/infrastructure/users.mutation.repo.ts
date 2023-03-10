import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../domain/user.schema';
import { ViewUserModel } from '../domain/user.types';

@Injectable()
export class UserMutationRepo {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createFriendship(userId: string, friendId: string): Promise<void> {
    const updateUser = await this.userModel.findOne({_id: new mongoose.Types.ObjectId(userId)})
    if(updateUser.friends.indexOf(friendId) === -1) {
      updateUser.friends.push(friendId)
    } else {
      updateUser.friends.slice(updateUser.friends.indexOf(friendId))
    }
    await updateUser.save()
    return
  }

  async createNewUser(user): Promise<ViewUserModel> {
    const createdUser = new this.userModel(user);
    await createdUser.save();
    return {
      _id: createdUser._id.toString(),
      login: createdUser.login,
      email: createdUser.email,
      createdAt: createdUser.createdAt,
    }
  }

  async updateCurrentUser(userId: string, login: string): Promise<void> {
    const updateUser = await this.userModel.findOne({_id: new mongoose.Types.ObjectId(userId)}).exec()
    updateUser.login = login
    await updateUser.save()
    return 
  }

  async updateTokenCurrentUser(userId: string, tokenDate: number): Promise<void> {
    const updateUser = await this.userModel.findOne({_id: new mongoose.Types.ObjectId(userId)}).exec()
    updateUser.tokenDate = tokenDate
    await updateUser.save()
    return
  }

  async deleteCurrentUser(userId: string): Promise<void> {
    await this.userModel.deleteOne({_id: new mongoose.Types.ObjectId(userId)})
    return 
  }

  async logOutCurrentUser(userId: string): Promise<void> {
    const updateUser = await this.userModel.findOne({_id: new mongoose.Types.ObjectId(userId)}).exec()
    updateUser.tokenDate = 0
    await updateUser.save()
    return
  }

}