import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GoodDeed, GoodDeedDocument } from '../domain/goodDeed.schema';
import { Comment, CommentDocument } from '../../comments/domain/comment.schema';
import { PaginatorDto } from '../../../helpers/common/types/paginator.dto';

@Injectable()
export class GoodDeedQueryRepo {
  constructor(
    @InjectModel(GoodDeed.name) private goodDeedModel: Model<GoodDeedDocument>
  ) {}

  async findAllGoodDeedsByUserId(userId: string, query: PaginatorDto) {
    const result = await this.goodDeedModel.aggregate([
      {$match: {userId: new mongoose.Types.ObjectId(userId), isDeleted: false}},
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'goodDeedId',
          as: 'comments',
        },
      },
    ])
    return result
  }

  async findAllGoodDeedsForCurrentUser(userId: string, query: PaginatorDto) {
    const result = await this.goodDeedModel.aggregate([
      {$match: {userId: new mongoose.Types.ObjectId(userId), isDeleted: false}},
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'goodDeedId',
          as: 'comments',
        },
      },
    ])
    return result
  }

}