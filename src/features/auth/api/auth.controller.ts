import {Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ViewUserModel } from '../../users/domain/user.types';
import { ConfirmMailCommand } from '../application/ConfirmMailUseCase';
import { LoginCommand } from '../application/LoginUseCase';
import { LogoutCommand } from '../application/LogoutUseCase';
import { RegistrationCommand } from '../application/RegistrationUseCase';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RegistrationConfirmationDto, RegistrationDto } from '../types/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private commandBus: CommandBus,
    ) {}

    @Post('registration')
    async registration(@Body() registrationDto: RegistrationDto, @Req() req): Promise<ViewUserModel> {
        return await this.commandBus.execute(new RegistrationCommand(registrationDto, req.headers.origin))
    }

    @Post('confirm-mail')
    async confirmMail(@Body() registrationConfirmationDto: RegistrationConfirmationDto){
        return await this.commandBus.execute(new ConfirmMailCommand())
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req, @Res({ passthrough: true }) res){
        const result = await this.commandBus.execute(new LoginCommand(req.user.userId))
        res.cookie(
            'refreshToken', 
            result.refreshToken, 
            {
                sameSite: 'none',
                httpOnly: true,
                secure: true,
                maxAge: 24*60*60*1000,
            }
        );
        return { accessToken: result.accessToken };
    }

    @UseGuards(LocalAuthGuard)
    @Post('logout')
    async logout(@Req() req){
        return await this.commandBus.execute(new LogoutCommand(req.user.userId))
    }
}