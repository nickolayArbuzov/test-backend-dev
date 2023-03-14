import { CommandBus, QueryHandler } from '@nestjs/cqrs';
import { GoodDeedQueryRepo } from '../infrastructure/goodDeeds.query.repo';
import { PaginatorDto } from '../../../helpers/common/types/paginator.dto';

export class FindAllGoodDeedsForCurrentUserQuery {
  constructor(
    public userId: string,
    public query: PaginatorDto,
  ) {}
}

@QueryHandler(FindAllGoodDeedsForCurrentUserQuery)
export class FindAllGoodDeedsForCurrentUserUseCase {
  constructor(
    private goodDeedQueryRepo: GoodDeedQueryRepo,
  ) {}

  async execute(query: FindAllGoodDeedsForCurrentUserQuery){
    const queryParams = {
      pageNumber: query.query.pageNumber || '1',
      pageSize: query.query.pageSize || '10',
    }
    await this.goodDeedQueryRepo.findAllGoodDeedsForCurrentUser(query.userId, queryParams)
    return 
  }
}