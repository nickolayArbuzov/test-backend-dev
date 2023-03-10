import { Module } from '@nestjs/common';
import { CommentsModule } from '../../features/comments/comments.module';
import { GoodDeedsModule } from '../../features/goodDeeds/goodDeeds.module';
import { UsersModule } from '../../features/users/users.module';
import { AllDataController } from './delete-all-data.controller';
import { AllDataService } from './delete-all-data.service';

@Module({
  controllers: [AllDataController],
  imports: [CommentsModule, GoodDeedsModule, UsersModule],
  providers: [
    AllDataService,
  ],
})
export class AllDataModule {}
