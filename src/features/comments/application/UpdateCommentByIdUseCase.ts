import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { UpdateCommentDto } from '../domain/comment.dto';
import { CommentsMutationRepo } from '../infrastructure/comments.mutation.repo';

export class UpdateCommentByIdCommand {
  constructor(
    public updateCommentDto: UpdateCommentDto,
    public userId: string,
    public commentId: string,
  ) {}
}

@CommandHandler(UpdateCommentByIdCommand)
export class UpdateCommentByIdUseCase {
  constructor(
    private commentsMutationRepo: CommentsMutationRepo,
  ) {}

  async execute(command: UpdateCommentByIdCommand){
    const result = await this.commentsMutationRepo.updateCommentById(command.updateCommentDto, command.userId, command.commentId)
    if(!result) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND)
    } else {
      return
    }
  }
}