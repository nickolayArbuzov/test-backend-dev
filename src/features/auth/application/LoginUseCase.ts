import { ConfigService } from '@nestjs/config';
import { CommandHandler } from '@nestjs/cqrs';
import { JWT } from '../../../helpers/jwt';
import { UserMutationRepo } from '../../users/infrastructure/users.mutation.repo';

export class LoginCommand {
  constructor(
    public userId: string,
  ) {}
}

@CommandHandler(LoginCommand)
export class LoginUseCase {
  constructor(
    private userMutationRepo: UserMutationRepo,
    private jwtService: JWT,
    private configService: ConfigService,
  ) {}

  async execute(command: LoginCommand){
    const tokenDate = new Date().getTime()

    const payloadAccess = {userId: command.userId || '', tokenDate}
    const payloadRefresh = {userId: command.userId || '', tokenDate}
    const accessToken = this.jwtService.sign(payloadAccess, {expiresIn: `${Number(this.configService.get('JWT_PERIOD')) / 2}s`})
    const refreshToken = this.jwtService.sign(payloadRefresh, {expiresIn: `${Number(this.configService.get('JWT_PERIOD'))}s`})
    await this.userMutationRepo.updateTokenCurrentUser(command.userId, tokenDate)
    return {
      accessToken,
      refreshToken
    }
  }
}