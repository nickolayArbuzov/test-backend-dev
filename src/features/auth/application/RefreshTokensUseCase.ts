import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler } from '@nestjs/cqrs';
import { JWT } from '../../../helpers/jwt';
import { UserMutationRepo } from '../../users/infrastructure/users.mutation.repo';
import { UserQueryRepo } from '../../users/infrastructure/users.query.repo';

export class RefreshTokensCommand {
  constructor(
    public token: string
  ) {}
}

@CommandHandler(RefreshTokensCommand)
export class RefreshTokensUseCase {
  constructor(
    private userMutationRepo: UserMutationRepo,
    private userQueryRepo: UserQueryRepo,
    private jwtService: JWT,
    private configService: ConfigService,
  ) {}

  async execute(command: RefreshTokensCommand){
    const token = this.jwtService.verify(command.token);
    const user = await this.userQueryRepo.findUserByTokenDate(token.tokenDate)
    if(user) {
      const tokenDate = new Date().getTime()
      const payloadAccess = {userId: user._id.toString() || '', tokenDate}
      const payloadRefresh = {userId: user._id.toString() || '', tokenDate}
      const accessToken = this.jwtService.sign(payloadAccess, {expiresIn: `${Number(this.configService.get('JWT_PERIOD')) / 2}s`})
      const refreshToken = this.jwtService.sign(payloadRefresh, {expiresIn: `${Number(this.configService.get('JWT_PERIOD'))}s`})
      await this.userMutationRepo.updateTokenCurrentUser(user._id.toString(), tokenDate)
      return {
        accessToken,
        refreshToken
      }
    } else {
      throw new HttpException('Auth not found', HttpStatus.UNAUTHORIZED)
    }
  }
} 