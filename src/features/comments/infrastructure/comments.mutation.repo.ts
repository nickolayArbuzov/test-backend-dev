import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from '../domain/comment.schema';
import { UpdateCommentDto } from '../domain/comment.dto';
import { ViewCommentModel } from '../domain/comment.types';

@Injectable()
export class CommentsMutationRepo {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async createCommentForSpecificGoodDeed(comment: Comment): Promise<ViewCommentModel>{
    const createdComment = new this.commentModel(comment);
    await createdComment.save();
    return new ViewCommentModel(createdComment)
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


