import { IsBoolean, IsString } from "class-validator";

export class CreateGoodDeedDto {
    @IsString()
    readonly title: string;
}

export class UpdateGoodDeedDto {
    @IsBoolean()
    readonly isDone: boolean;
}

