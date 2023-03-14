import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, Matches } from "class-validator";

export class AuthDto {
    @ApiProperty()
    @IsString()
    loginOrEmail: string;

    @ApiProperty()
    @IsString()
    password: string;
}

export class RegistrationDto {
    @ApiProperty({description: 'user login', minLength: 3, maxLength: 10})
    @IsString()
    @Length(3, 10)
    readonly login: string;

    @ApiProperty({description: 'user password', minLength: 6, maxLength: 20})
    @IsString()
    @Length(6, 20)
    readonly password: string;
    
    @ApiProperty({description: 'user email'})
    @IsString()
    @Matches(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4}$)/)
    readonly email: string;
}

export class RegistrationConfirmationDto {
    @ApiProperty({description: 'confirmation code'})
    @IsString()
    readonly code: string;
}




