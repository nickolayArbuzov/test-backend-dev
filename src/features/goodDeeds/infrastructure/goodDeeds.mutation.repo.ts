import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GoodDeed, GoodDeedDocument } from '../domain/goodDeed.schema';
import { ViewGoodDeedModel } from '../domain/goodDeed.types';
import { UpdateGoodDeedDto } from '../domain/goodDeed.dto';

@Injectable()
export class GoodDeedMutationRepo {
  constructor(@InjectModel(GoodDeed.name) private goodDeedModel: Model<GoodDeedDocument>) {}

  async createGoodDeed(goodDeed: GoodDeed): Promise<ViewGoodDeedModel> {
    const createdGoodDeed = new this.goodDeedModel(goodDeed);
    await createdGoodDeed.save();
    return new ViewGoodDeedModel(createdGoodDeed)
  }

  async updateGoodDeed(updateGoodDeedDto: UpdateGoodDeedDto, userId: string, commentId: string) {
    const updatedGoodDeed = await this.goodDeedModel.findOne({_id: new mongoose.Types.ObjectId(commentId), userId: userId, isDeleted: false})
    if(updatedGoodDeed) {
      updatedGoodDeed.isDone = updateGoodDeedDto.isDone
      await updatedGoodDeed.save()
      return true
    }
    return false
  }

  async deleteGoodDeedById(userId: string, commentId: string){
    const deletedGoodDeed = await this.goodDeedModel.findOne({_id: new mongoose.Types.ObjectId(commentId), userId: userId, isDeleted: false})
    if(deletedGoodDeed) {
      deletedGoodDeed.isDeleted = true
      await deletedGoodDeed.save()
      return true
    }
    return false
  }

}