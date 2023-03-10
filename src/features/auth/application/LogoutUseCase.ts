import { CommandHandler } from '@nestjs/cqrs';
import { UserMutationRepo } from '../../users/infrastructure/users.mutation.repo';

export class LogoutCommand {
  constructor(
    public userId: string,
  ) {}
}

@CommandHandler(LogoutCommand)
export class LogoutUseCase {
  constructor(
    private userMutationRepo: UserMutationRepo,
  ) {}

  execute(command: LogoutCommand){
    this.userMutationRepo.logOutCurrentUser(command.userId)
    return
  }
}