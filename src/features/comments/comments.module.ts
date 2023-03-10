import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsController } from './api/comments.controller';
import { CreateCommentForSpecificGoodDeedUseCase } from './application/CreateCommentForSpecificGoodDeedUseCase';
import { DeleteCommentByIdUseCase } from './application/DeleteCommentByIdUseCase';
import { UpdateCommentByIdUseCase } from './application/UpdateCommentByIdUseCase';
import { Comment, CommentSchema } from './domain/comment.schema';
import { CommentsMutationRepo } from './infrastructure/comments.mutation.repo';

const commands = [CreateCommentForSpecificGoodDeedUseCase, DeleteCommentByIdUseCase, UpdateCommentByIdUseCase]

@Module({
  controllers: [CommentsController], 
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  providers: [
    CommentsMutationRepo,
    ...commands,
  ],
  exports: [
    MongooseModule,
  ]
})
export class CommentsModule {}