import { CommandHandler } from '@nestjs/cqrs';
import { UpdateGoodDeedDto } from '../domain/goodDeed.dto';
import { GoodDeedMutationRepo } from '../infrastructure/goodDeeds.mutation.repo';

export class UpdateGoodDeedCommand {
  constructor(
    public updateGoodDeedDto: UpdateGoodDeedDto,
    public userId: string,
    public goodDeedId: string,
  ) {}
}

@CommandHandler(UpdateGoodDeedCommand)
export class UpdateGoodDeedUseCase {
  constructor(
    private goodDeedMutationRepo: GoodDeedMutationRepo,
  ) {}

  execute(command: UpdateGoodDeedCommand){
    this.goodDeedMutationRepo.updateGoodDeed(command.updateGoodDeedDto, command.userId, command.goodDeedId)
    return 
  }
}