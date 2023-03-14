import { QueryHandler } from '@nestjs/cqrs';
import { PaginatorDto } from '../../../helpers/common/types/paginator.dto';
import { GoodDeedQueryRepo } from '../infrastructure/goodDeeds.query.repo';

export class FindAllGoodDeedsByUserIdQuery {
  constructor(
    public userId: string,
    public query: PaginatorDto,
  ) {}
}

@QueryHandler(FindAllGoodDeedsByUserIdQuery)
export class FindAllGoodDeedsByUserIdUseCase {
  constructor(
    private goodDeedQueryRepo: GoodDeedQueryRepo,
  ) {}

  async execute(query: FindAllGoodDeedsByUserIdQuery){
    const queryParams = {
      pageNumber: query.query.pageNumber || '1',
      pageSize: query.query.pageSize || '10',
    }
    await this.goodDeedQueryRepo.findAllGoodDeedsByUserId(query.userId, queryParams)
    return 
  }
}