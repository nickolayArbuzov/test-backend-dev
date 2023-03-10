import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { CommentsMutationRepo } from '../infrastructure/comments.mutation.repo';

export class DeleteCommentByIdCommand {
  constructor(
    public userId: string,
    public commentId: string,
  ) {}
}

@CommandHandler(DeleteCommentByIdCommand)
export class DeleteCommentByIdUseCase {
  constructor(
    private commentsMutationRepo: CommentsMutationRepo,
  ) {}

  async execute(command: DeleteCommentByIdCommand){
    const result = await this.commentsMutationRepo.deleteCommentById(command.userId, command.commentId)
    if(!result) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND)
    } else {
      return
    }
  }
}