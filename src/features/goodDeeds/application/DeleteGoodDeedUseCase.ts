import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { GoodDeedMutationRepo } from '../infrastructure/goodDeeds.mutation.repo';

export class DeleteGoodDeedCommand {
  constructor(
    public userId: string,
    public goodDeedId: string,
  ) {}
}

@CommandHandler(DeleteGoodDeedCommand)
export class DeleteGoodDeedUseCase {
  constructor(
    private goodDeedMutationRepo: GoodDeedMutationRepo,
  ) {}

  async execute(command: DeleteGoodDeedCommand){
    const result = await this.goodDeedMutationRepo.deleteGoodDeedById(command.userId, command.goodDeedId)
    if(!result) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND)
    } else {
      return
    }
  }
}