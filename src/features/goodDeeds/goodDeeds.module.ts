import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { GoodDeedsController } from './api/goodDeeds.controller';
import { CreateGoodDeedUseCase } from './application/CreateGoodDeedUseCase';
import { DeleteGoodDeedUseCase } from './application/DeleteGoodDeedUseCase';
import { FindAllGoodDeedsByUserIdUseCase } from './application/FindAllGoodDeedsByUserIdUseCase';
import { FindAllGoodDeedsForCurrentUserUseCase } from './application/FindAllGoodDeedsForCurrentUserUseCase';
import { UpdateGoodDeedUseCase } from './application/UpdateGoodDeedUseCase';
import { GoodDeed, GoodDeedSchema } from './domain/goodDeed.schema';
import { GoodDeedMutationRepo } from './infrastructure/goodDeeds.mutation.repo';
import { GoodDeedQueryRepo } from './infrastructure/goodDeeds.query.repo';

const commands = [CreateGoodDeedUseCase, DeleteGoodDeedUseCase, UpdateGoodDeedUseCase]
const queries = [FindAllGoodDeedsByUserIdUseCase, FindAllGoodDeedsForCurrentUserUseCase]

@Module({
  controllers: [GoodDeedsController],
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: GoodDeed.name, schema: GoodDeedSchema }]),
  ],
  providers: [
    GoodDeedMutationRepo,
    GoodDeedQueryRepo,
    ...commands,
    ...queries,
  ],
  exports: [
    MongooseModule,
  ]
})
export class GoodDeedsModule {}