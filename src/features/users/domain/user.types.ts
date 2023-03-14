import { ApiProperty } from "@nestjs/swagger"
import { UserDocument } from "./user.schema"

export class ViewUserModel {
    @ApiProperty()
    _id: string
    @ApiProperty()
    login: string
    @ApiProperty()
    email: string
    @ApiProperty()
    createdAt: string
    constructor(user: UserDocument) {
        this._id = user._id.toString(),
        this.login = user.login,
        this.email = user.email,
        this.createdAt = user.createdAt
    }
}

export class PaginationDto<T> {
    @ApiProperty()
    pageSize: number
    @ApiProperty({type: 'array'})
    items: T[]
}
