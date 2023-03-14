import { QueryHandler } from '@nestjs/cqrs';
import { PaginatorDto } from '../../../helpers/common/types/paginator.dto';
import { UserQueryRepo } from '../infrastructure/users.query.repo';

export class FindAllUsersQuery {
  constructor(
    public query: PaginatorDto
  ) {}
}

@QueryHandler(FindAllUsersQuery)
export class FindAllUsersUseCase {
  constructor(
    private userQueryRepo: UserQueryRepo,
  ) {}

  execute(query: FindAllUsersQuery){
    const queryParams = {
      pageNumber: query.query.pageNumber || '1',
      pageSize: query.query.pageSize || '10',
    }
    this.userQueryRepo.findAllUsers(queryParams)
    return
  }
}