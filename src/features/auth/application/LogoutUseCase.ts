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

  async execute(command: LogoutCommand){
    await this.userMutationRepo.logOutCurrentUser(command.userId)
    return
  }
}