import { CommandBus, QueryHandler } from '@nestjs/cqrs';
import { GoodDeedQueryRepo } from '../infrastructure/goodDeeds.query.repo';

export class FindAllGoodDeedsForCurrentUserQuery {
  constructor(
    public userId: string,
  ) {}
}

@QueryHandler(FindAllGoodDeedsForCurrentUserQuery)
export class FindAllGoodDeedsForCurrentUserUseCase {
  constructor(
    private goodDeedQueryRepo: GoodDeedQueryRepo,
  ) {}

  execute(query: FindAllGoodDeedsForCurrentUserQuery){
    this.goodDeedQueryRepo.findAllGoodDeedsForCurrentUser(query.userId)
    return 
  }
}