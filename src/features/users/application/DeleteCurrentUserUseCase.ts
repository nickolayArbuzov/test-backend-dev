import { CommandHandler } from '@nestjs/cqrs';
import { UserMutationRepo } from '../infrastructure/users.mutation.repo';

export class DeleteCurrentUserCommand {
  constructor(
    public userId: string,
  ) {}
}

@CommandHandler(DeleteCurrentUserCommand)
export class DeleteCurrentUserUseCase {
  constructor(
    private userMutationRepo: UserMutationRepo,
  ) {}

  execute(command: DeleteCurrentUserCommand){
    this.userMutationRepo.deleteCurrentUser(command.userId)
    return 
  }
}