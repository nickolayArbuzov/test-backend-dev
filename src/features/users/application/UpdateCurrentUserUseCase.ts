import { CommandHandler } from '@nestjs/cqrs';
import { UpdateCurrentUserDto } from '../domain/user.dto';
import { UserMutationRepo } from '../infrastructure/users.mutation.repo';

export class UpdateCurrentUserCommand {
  constructor(
    public updateCurrentUserDto: UpdateCurrentUserDto,
    public userId: string,
  ) {}
}

@CommandHandler(UpdateCurrentUserCommand)
export class UpdateCurrentUserUseCase {
  constructor(
    private userMutationRepo: UserMutationRepo,
  ) {}

  execute(command: UpdateCurrentUserCommand){
    this.userMutationRepo.updateCurrentUser(command.updateCurrentUserDto.newLogin, command.userId)
    return 
  }
}