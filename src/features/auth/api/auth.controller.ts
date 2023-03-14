import {Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CookieGuard } from '../../../helpers/guards/cookie.guard';
import { ApiResponseError } from '../../../helpers/common/swagger-decorators/error-api-swagger';
import { ErrorSwagger } from '../../../helpers/common/types/errored';
import { ViewUserModel } from '../../users/domain/user.types';
import { ConfirmMailCommand } from '../application/ConfirmMailUseCase';
import { LoginCommand } from '../application/LoginUseCase';
import { LogoutCommand } from '../application/LogoutUseCase';
import { RegistrationCommand } from '../application/RegistrationUseCase';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { AuthDto, RegistrationConfirmationDto, RegistrationDto } from '../types/auth.dto';
import { RefreshTokensCommand } from '../application/RefreshTokensUseCase';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private commandBus: CommandBus,
    ) {}

    @Post('registration')
    @ApiResponse({ status: 201, description: 'The user has been successfully registrated.', type: ViewUserModel})
    @ApiResponseError(ErrorSwagger)
    async registration(@Body() registrationDto: RegistrationDto, @Req() req): Promise<ViewUserModel> {
        return await this.commandBus.execute(new RegistrationCommand(registrationDto, req.headers.origin))
    }

    @Post('confirm-mail')
    @ApiResponse({ status: 201, description: 'The mail has been successfully confirmed.'})
    @ApiResponseError(ErrorSwagger)
    async confirmMail(@Body() registrationConfirmationDto: RegistrationConfirmationDto){
        return await this.commandBus.execute(new ConfirmMailCommand(registrationConfirmationDto))
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({type: AuthDto})
    @ApiResponse({ status: 201, description: 'The user has been successfully login.'})
    @ApiResponseError(ErrorSwagger)
    @ApiResponse({ status: 401, description: 'Not authorized.'})
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

    @ApiBearerAuth()
    @UseGuards(CookieGuard)
    @Post('refresh-token')
    @ApiResponse({ status: 201, description: 'The user has been successfully refresh tokens.'})
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    async refreshTokens(@Req() req, @Res({ passthrough: true }) res){
        const result = await this.commandBus.execute(new RefreshTokensCommand(req.cookies.refreshToken))
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

    @ApiBearerAuth()
    @UseGuards(JwtStrategy)
    @Post('logout')
    @ApiResponse({ status: 201, description: 'The user has been successfully logout.'})
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    async logout(@Req() req){
        return await this.commandBus.execute(new LogoutCommand(req.user.userId))
    }
}