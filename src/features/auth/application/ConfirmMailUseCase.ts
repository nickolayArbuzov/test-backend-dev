import { CommandHandler } from '@nestjs/cqrs';
import { UserMutationRepo } from '../../users/infrastructure/users.mutation.repo';
import { RegistrationConfirmationDto } from '../types/auth.dto';

export class ConfirmMailCommand {
  constructor(
    
  ) {}
}

@CommandHandler(ConfirmMailCommand)
export class ConfirmMailUseCase {
  constructor(
    private userMutationRepo: UserMutationRepo,
  ) {}

  execute(){
    return
  }
}