import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class CreateGoodDeedDto {
    @ApiProperty()
    @IsString()
    readonly title: string;
}

export class UpdateGoodDeedDto {
    @ApiProperty()
    @IsBoolean()
    readonly isDone: boolean;
}

