import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from '../../features/comments/domain/comment.schema';
import { GoodDeed, GoodDeedDocument } from '../../features/goodDeeds/domain/goodDeed.schema';
import { User, UserDocument } from '../../features/users/domain/user.schema';

@Injectable()
export class AllDataService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(GoodDeed.name) private goodDeedModel: Model<GoodDeedDocument>,
  ) {}

  async deleteAllData(): Promise<void> {
    await this.userModel.deleteMany({})
    await this.commentModel.deleteMany({})
    await this.goodDeedModel.deleteMany({})
  }
  
}