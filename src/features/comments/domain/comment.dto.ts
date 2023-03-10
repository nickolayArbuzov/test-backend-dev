import { IsString } from "class-validator";

export class UpdateCommentDto {
    @IsString()
    readonly content: string;
}

export class CreateCommentDto extends UpdateCommentDto {
    @IsString()
    readonly goodDeedId: string;
}