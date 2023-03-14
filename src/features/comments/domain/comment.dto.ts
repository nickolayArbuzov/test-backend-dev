import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateCommentDto {
    @ApiProperty()
    @IsString()
    readonly content: string;
}

export class CreateCommentDto extends UpdateCommentDto {
    @ApiProperty()
    @IsString()
    readonly goodDeedId: string;
}