import { CommandHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { ViewUserModel } from '../../users/domain/user.types';
import {v4} from 'uuid';
import { UserMutationRepo } from '../../users/infrastructure/users.mutation.repo';
import { RegistrationDto } from '../types/auth.dto';
import { MailService } from '../../../adapters/mail/mail.service';

export class RegistrationCommand {
  constructor(
    public newUser: RegistrationDto,
    public source: string,
  ) {}
}

@CommandHandler(RegistrationCommand)
export class RegistrationUseCase {
  constructor(
    private userMutationRepo: UserMutationRepo,
    private mailService: MailService,
  ) {}

  async execute(command: RegistrationCommand): Promise<ViewUserModel>{
    const passwordSalt = await bcrypt.genSalt(8)
    const passwordHash = await bcrypt.hash(command.newUser.password, passwordSalt)
    const code = v4()

    const date = new Date()
    const user = {
      login: command.newUser.login,
      email: command.newUser.email,
      passwordHash: passwordHash,
      passwordSalt: passwordSalt,
      isActivated: false,
      code: code,
      createdAt: date.toISOString(),
      rating: 0,
      isDeleted: false,
    }

    const createdUser = await this.userMutationRepo.createNewUser(user)
    await this.mailService.sendEmail(command.source, command.newUser.email, code, 'confirm-email?code')
    return createdUser
  }
}