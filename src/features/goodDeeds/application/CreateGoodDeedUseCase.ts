import { CommandHandler } from '@nestjs/cqrs';
import * as mongoose from 'mongoose';
import { CreateGoodDeedDto } from '../domain/goodDeed.dto';
import { GoodDeedMutationRepo } from '../infrastructure/goodDeeds.mutation.repo';

export class CreateGoodDeedCommand {
  constructor(
    public createGoodDeedDto: CreateGoodDeedDto,
    public userId: string,
  ) {}
}

@CommandHandler(CreateGoodDeedCommand)
export class CreateGoodDeedUseCase {
  constructor(
    private goodDeedMutationRepo: GoodDeedMutationRepo,
  ) {}

  async execute(command: CreateGoodDeedCommand){
    const date = new Date()
    //TODO типизация
    const goodDeed = {
      userId: new mongoose.Types.ObjectId(command.userId),
      title: command.createGoodDeedDto.title,
      createdAt: date.toISOString(),
      isDone: false,
      isDeleted: false,
    }
    const createdGoodDeed = await this.goodDeedMutationRepo.createGoodDeed(goodDeed)
    return createdGoodDeed
  }
}