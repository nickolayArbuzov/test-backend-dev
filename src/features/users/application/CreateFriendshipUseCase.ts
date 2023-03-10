import { CommandHandler } from '@nestjs/cqrs';
import { UserMutationRepo } from '../infrastructure/users.mutation.repo';

export class CreateFriendshipCommand {
  constructor(
    public userId: string,
    public friendId: string,
  ) {}
}

@CommandHandler(CreateFriendshipCommand)
export class CreateFriendshipUseCase {
  constructor(
    private userMutationRepo: UserMutationRepo,
  ) {}

  execute(command: CreateFriendshipCommand){
    this.userMutationRepo.createFriendship(command.userId, command.friendId)
    return 
  }
}