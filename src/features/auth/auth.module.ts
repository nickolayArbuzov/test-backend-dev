import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { MailModule } from '../../adapters/mail/mail.module';
import { JWT } from '../../helpers/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './api/auth.controller';
import { ConfirmMailUseCase } from './application/ConfirmMailUseCase';
import { LoginUseCase } from './application/LoginUseCase';
import { LogoutUseCase } from './application/LogoutUseCase';
import { RefreshTokensUseCase } from './application/RefreshTokensUseCase';
import { RegistrationUseCase } from './application/RegistrationUseCase';

const commands = [ConfirmMailUseCase, LoginUseCase, LogoutUseCase, RegistrationUseCase, RefreshTokensUseCase]

@Module({
  controllers: [AuthController],
  imports: [
    MailModule,
    CqrsModule,
    UsersModule,
  ],
  providers: [
    JwtService,
    JWT,
    ...commands,
  ],
})
export class AuthModule {}