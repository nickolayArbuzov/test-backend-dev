import { ApiProperty } from "@nestjs/swagger"
import { CommentDocument } from "./comment.schema"

export class ViewCommentModel {
    @ApiProperty()
    _id: string
    @ApiProperty()
    content: string
    @ApiProperty()
    createdAt: string
    constructor(comment: CommentDocument) {
        this._id = comment._id.toString(),
        this.content = comment.content,
        this.createdAt = comment.createdAt
    }
}