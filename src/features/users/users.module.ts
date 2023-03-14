import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsModule } from '../comments/comments.module';
import { GoodDeedsModule } from '../goodDeeds/goodDeeds.module';
import { UsersController } from './api/users.controller';
import { User, UserSchema } from './domain/user.schema';
import { UserMutationRepo } from './infrastructure/users.mutation.repo';
import { UserQueryRepo } from './infrastructure/users.query.repo';

const commands = []

@Module({
  controllers: [UsersController],
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CommentsModule,
    GoodDeedsModule,
  ],
  providers: [
    UserMutationRepo,
    UserQueryRepo,
    ...commands,
  ],
  exports: [
    UserMutationRepo,
    UserQueryRepo,
    MongooseModule,
  ]
})
export class UsersModule {}