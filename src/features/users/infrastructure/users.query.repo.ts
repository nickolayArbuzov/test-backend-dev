import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../domain/user.schema';
import { PaginatorDto } from '../../../helpers/common/types/paginator.dto';

@Injectable()
export class UserQueryRepo {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAllUsers(query: PaginatorDto) {
    const users = await this.userModel.find({isDeleted: false})
      .skip((+query.pageNumber - 1) * +query.pageSize)
      .limit(+query.pageSize)
    return users
  }

  async findUserByLoginOrEmail(username: string) {
    return await this.userModel.findOne(
      {isDeleted: false, $or: [{"login": username}, {"email": username}]}
    )
  }

  async findUserByTokenDate(tokenDate: number) {
    return await this.userModel.findOne(
      {refreshTokenDate: tokenDate}
    )
  }

}