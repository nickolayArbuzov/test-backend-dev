import { CommandHandler } from '@nestjs/cqrs';
import { UserMutationRepo } from '../../users/infrastructure/users.mutation.repo';
import { RegistrationConfirmationDto } from '../types/auth.dto';

export class ConfirmMailCommand {
  constructor(
    public registrationConfirmationDto: RegistrationConfirmationDto
  ) {}
}

@CommandHandler(ConfirmMailCommand)
export class ConfirmMailUseCase {
  constructor(
    private userMutationRepo: UserMutationRepo,
  ) {}

  async execute(command: ConfirmMailCommand){
    await this.userMutationRepo.registrationConfirmation(command.registrationConfirmationDto.code)
    return
  }
}