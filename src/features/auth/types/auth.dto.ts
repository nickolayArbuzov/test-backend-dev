import { IsString, Length, Matches, Validate } from "class-validator";

export class PasswordRecoveryDto {
    @IsString()
    @Matches(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4}$)/)
    readonly email: string;
}

export class NewPasswordDto {
    @IsString()
    @Length(6, 20)
    readonly newPassword: string;

    @IsString()
    readonly recoveryCode: string;
}

export class RegistrationEmailResendingDto {
    @IsString()
    readonly email: string;
}

export class AuthDto {
    @IsString()
    loginOrEmail: string;

    @IsString()
    password: string;
}

export class RegistrationDto {
    @IsString()
    @Length(3, 10)
    readonly login: string;

    @IsString()
    @Length(6, 20)
    readonly password: string;
    
    @IsString()
    @Matches(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4}$)/)
    readonly email: string;
}

export class RegistrationConfirmationDto {
    @IsString()
    readonly code: string;
}




