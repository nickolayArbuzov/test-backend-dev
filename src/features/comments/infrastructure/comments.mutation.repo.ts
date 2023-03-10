import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from '../domain/comment.schema';
import { UpdateCommentDto } from '../domain/comment.dto';

@Injectable()
export class CommentsMutationRepo {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async createCommentForSpecificGoodDeed(comment){
    const createdComment = new this.commentModel(comment);
    await createdComment.save();
    return {
      _id: createdComment._id.toString(),
      content: createdComment.content,
      createdAt: createdComment.createdAt,
    }
  }

  async updateCommentById(updateCommentDto: UpdateCommentDto, userId: string, commentId: string){
    const updatedComment = await this.commentModel.findOne({_id: new mongoose.Types.ObjectId(commentId), userId: userId, isDeleted: false})
    if(updatedComment) {
      updatedComment.content = updateCommentDto.content
      await updatedComment.save()
      return true
    }
    return false
  }

  async deleteCommentById(userId: string, commentId: string){
    const deletedComment = await this.commentModel.findOne({_id: new mongoose.Types.ObjectId(commentId), userId: userId, isDeleted: false})
    if(deletedComment) {
      deletedComment.isDeleted = true
      await deletedComment.save()
      return true
    }
    return false
  }

}
