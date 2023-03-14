import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../domain/user.schema';
import { ViewUserModel } from '../domain/user.types';
import { GoodDeed, GoodDeedDocument } from '../../goodDeeds/domain/goodDeed.schema';
import { Comment, CommentDocument } from '../../comments/domain/comment.schema';

@Injectable()
export class UserMutationRepo {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(GoodDeed.name) private goodDeedModel: Model<GoodDeedDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

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

  async createNewUser(user: User): Promise<ViewUserModel> {
    const createdUser = new this.userModel(user);
    await createdUser.save();
    return new ViewUserModel(createdUser)
  }

  async updateCurrentUser(userId: string, login: string): Promise<void> {
    const updateUser = await this.userModel.findOne({_id: new mongoose.Types.ObjectId(userId)}).exec()
    updateUser.login = login
    await updateUser.save()
    return 
  }

  async updateTokenCurrentUser(userId: string, tokenDate: number): Promise<void> {
    const updateUser = await this.userModel.findOne({_id: new mongoose.Types.ObjectId(userId)}).exec()
    updateUser.accessTokenDate = tokenDate
    updateUser.refreshTokenDate = tokenDate
    await updateUser.save()
    return
  }

  async deleteCurrentUser(userId: string): Promise<void> {
    const deleteUser = await this.userModel.findOne({_id: new mongoose.Types.ObjectId(userId), isDeleted: false}).exec()
    deleteUser.isDeleted = true
    deleteUser.save()
    await this.goodDeedModel.updateMany({userId: new mongoose.Types.ObjectId(userId)}, {$set: {isDeleted: true}})
    await this.commentModel.updateMany({userId: new mongoose.Types.ObjectId(userId)}, {$set: {isDeleted: true}})
    return 
  }

  async logOutCurrentUser(userId: string): Promise<void> {
    const updateUser = await this.userModel.findOne({_id: new mongoose.Types.ObjectId(userId)}).exec()
    updateUser.accessTokenDate = 0
    updateUser.refreshTokenDate = 0
    await updateUser.save()
    return
  }

  async registrationConfirmation(code: string): Promise<void> {
    const updateUser = await this.userModel.findOne({code: code}).exec()
    updateUser.code = code
    await updateUser.save()
    return
  }

}