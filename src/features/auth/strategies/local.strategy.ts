import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserQueryRepo } from '../../users/infrastructure/users.query.repo';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userQueryRepo: UserQueryRepo,
  ) {
    super({
      usernameField: 'loginOrEmail'
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const auth = await this.userQueryRepo.findByLoginOrEmail(username)
    if (!auth){
      throw new HttpException('Auth not found', HttpStatus.UNAUTHORIZED);
    }
    const candidateHash = await bcrypt.hash(password, auth.passwordSalt.toString())
    if (auth.passwordHash.toString() === candidateHash) {
      return { userId: auth._id }
    } else {
        throw new HttpException('Auth not found', HttpStatus.UNAUTHORIZED);
    }
  }
}