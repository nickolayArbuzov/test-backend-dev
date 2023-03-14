import { CommandHandler } from '@nestjs/cqrs';
import * as mongoose from 'mongoose';
import { CreateCommentDto } from '../domain/comment.dto';
import { CommentsMutationRepo } from '../infrastructure/comments.mutation.repo';

export class CreateCommentForSpecificGoodDeedCommand {
  constructor(
    public createCommentDto: CreateCommentDto,
    public userId: string,
  ) {}
}

@CommandHandler(CreateCommentForSpecificGoodDeedCommand)
export class CreateCommentForSpecificGoodDeedUseCase {
  constructor(
    private commentsMutationRepo: CommentsMutationRepo,
  ) {}

  async execute(command: CreateCommentForSpecificGoodDeedCommand){
    const date = new Date()
    const comment = {
      goodDeedId: new mongoose.Types.ObjectId(command.createCommentDto.goodDeedId),
      userId: new mongoose.Types.ObjectId(command.userId),
      content: command.createCommentDto.content,
      createdAt: date.toISOString(),
      updatedAt: '',
      isDeleted: false,
    }

    const createdComment = await this.commentsMutationRepo.createCommentForSpecificGoodDeed(comment)
    return createdComment
  }
}