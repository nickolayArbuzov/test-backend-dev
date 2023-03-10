import { QueryHandler } from '@nestjs/cqrs';
import { GoodDeedQueryRepo } from '../infrastructure/goodDeeds.query.repo';

export class FindAllGoodDeedsByUserIdQuery {
  constructor(
    public userId: string,
  ) {}
}

@QueryHandler(FindAllGoodDeedsByUserIdQuery)
export class FindAllGoodDeedsByUserIdUseCase {
  constructor(
    private goodDeedQueryRepo: GoodDeedQueryRepo,
  ) {}

  execute(query: FindAllGoodDeedsByUserIdQuery){
    this.goodDeedQueryRepo.findAllGoodDeedsByUserId(query.userId)
    return 
  }
}