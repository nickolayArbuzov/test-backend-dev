import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateGoodDeedCommand } from '../application/CreateGoodDeedUseCase';
import { DeleteGoodDeedCommand } from '../application/DeleteGoodDeedUseCase';
import { FindAllGoodDeedsByUserIdQuery } from '../application/FindAllGoodDeedsByUserIdUseCase';
import { FindAllGoodDeedsForCurrentUserQuery } from '../application/FindAllGoodDeedsForCurrentUserUseCase';
import { UpdateGoodDeedCommand } from '../application/UpdateGoodDeedUseCase';
import { CreateGoodDeedDto, UpdateGoodDeedDto } from '../domain/goodDeed.dto';

@ApiTags('goodDeeds')
@Controller('goodDeeds')
export class GoodDeedsController {

    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    async findAllGoodDeedsForCurrentUser(@Req() req){
        return this.queryBus.execute(new FindAllGoodDeedsForCurrentUserQuery(req.user.userId))
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    @ApiResponse({ status: 404, description: 'Not found or forbidden.'})
    async findAllGoodDeedsByUserId(@Param('id') id: string){
        return this.queryBus.execute(new FindAllGoodDeedsByUserIdQuery(id))
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Sending incorrect data.'})
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    async createGoodDeed(@Body() createGoodDeedDto: CreateGoodDeedDto, @Req() req){
        return this.commandBus.execute(new CreateGoodDeedCommand(createGoodDeedDto, req.user.userId))
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Sending incorrect data.'})
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    @ApiResponse({ status: 404, description: 'Not found or forbidden.'})
    async updateGoodDeed(@Body() updateGoodDeedDto: UpdateGoodDeedDto, @Req() req, @Param('id') id: string){
        return this.commandBus.execute(new UpdateGoodDeedCommand(updateGoodDeedDto, req.user.userId, id))
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiResponse({ status: 200, description: 'GoodDeed has been successfully deleted'})
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    @ApiResponse({ status: 404, description: 'Not found or forbidden.'})
    async deleteGoodDeed(@Req() req, @Param('id') id: string){
        return this.commandBus.execute(new DeleteGoodDeedCommand(req.user.userId, id))
    }
}