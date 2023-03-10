import { QueryHandler } from '@nestjs/cqrs';
import { UserQueryRepo } from '../infrastructure/users.query.repo';

export class FindAllUsersQuery {
  constructor(
    
  ) {}
}

@QueryHandler(FindAllUsersQuery)
export class FindAllUsersUseCase {
  constructor(
    private userQueryRepo: UserQueryRepo,
  ) {}

  execute(query: FindAllUsersQuery){
    this.userQueryRepo.findAllUsers()
    return
  }
}