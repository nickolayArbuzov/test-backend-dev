import { ApiProperty } from "@nestjs/swagger"
import { GoodDeedDocument } from "./goodDeed.schema"

export class ViewGoodDeedModel {
    @ApiProperty()
    _id: string
    @ApiProperty()
    title: string
    @ApiProperty()
    createdAt: string
    constructor(goodDeed: GoodDeedDocument) {
        this._id = goodDeed._id.toString(),
        this.title = goodDeed.title,
        this.createdAt = goodDeed.createdAt
    }
}