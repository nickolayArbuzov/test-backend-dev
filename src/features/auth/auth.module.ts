import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { JWT } from '../../helpers/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './api/auth.controller';
import { ConfirmMailUseCase } from './application/ConfirmMailUseCase';
import { LoginUseCase } from './application/LoginUseCase';
import { LogoutUseCase } from './application/LogoutUseCase';
import { RegistrationUseCase } from './application/RegistrationUseCase';

const commands = [ConfirmMailUseCase, LoginUseCase, LogoutUseCase, RegistrationUseCase]

@Module({
  controllers: [AuthController],
  imports: [
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