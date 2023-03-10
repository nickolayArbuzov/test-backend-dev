import { IsString, Length } from "class-validator";

export class UpdateCurrentUserDto {
    @IsString()
    @Length(6, 20)
    readonly newLogin: string;
}