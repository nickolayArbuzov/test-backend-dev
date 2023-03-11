import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './features/auth/auth.module';
import { JwtStrategy } from './features/auth/strategies/jwt.strategy';
import { LocalStrategy } from './features/auth/strategies/local.strategy';
import { CommentsModule } from './features/comments/comments.module';
import { GoodDeedsModule } from './features/goodDeeds/goodDeeds.module';
import { UsersModule } from './features/users/users.module';
import { AllDataModule } from './helpers/delete-all-data/delete-all-data.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    CommentsModule,
    GoodDeedsModule,
    UsersModule,
    AllDataModule, 
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LocalStrategy, 
    JwtStrategy,
  ],
})
export class AppModule {}
