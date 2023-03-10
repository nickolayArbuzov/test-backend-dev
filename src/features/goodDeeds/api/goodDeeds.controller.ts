import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateGoodDeedCommand } from '../application/CreateGoodDeedUseCase';
import { DeleteGoodDeedCommand } from '../application/DeleteGoodDeedUseCase';
import { FindAllGoodDeedsByUserIdQuery } from '../application/FindAllGoodDeedsByUserIdUseCase';
import { FindAllGoodDeedsForCurrentUserQuery } from '../application/FindAllGoodDeedsForCurrentUserUseCase';
import { UpdateGoodDeedCommand } from '../application/UpdateGoodDeedUseCase';
import { CreateGoodDeedDto, UpdateGoodDeedDto } from '../domain/goodDeed.dto';

@Controller('goodDeeds')
export class GoodDeedsController {

    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllGoodDeedsForCurrentUser(@Req() req){
        return this.queryBus.execute(new FindAllGoodDeedsForCurrentUserQuery(req.user.userId))
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findAllGoodDeedsByUserId(){
        return this.queryBus.execute(new FindAllGoodDeedsByUserIdQuery())
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createGoodDeed(@Body() createGoodDeedDto: CreateGoodDeedDto, @Req() req){
        return this.commandBus.execute(new CreateGoodDeedCommand(createGoodDeedDto, req.user.userId))
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateGoodDeed(@Body() updateGoodDeedDto: UpdateGoodDeedDto, @Req() req, @Param('id') id: string){
        return this.commandBus.execute(new UpdateGoodDeedCommand(updateGoodDeedDto, req.user.userId, id))
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteGoodDeed(@Req() req, @Param('id') id: string){
        return this.commandBus.execute(new DeleteGoodDeedCommand(req.user.userId, id))
    }
}