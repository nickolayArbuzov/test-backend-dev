import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginatorDto } from '../../../helpers/common/types/paginator.dto';
import { ApiResponseError } from '../../../helpers/common/swagger-decorators/error-api-swagger';
import { ErrorSwagger } from '../../../helpers/common/types/errored';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateGoodDeedCommand } from '../application/CreateGoodDeedUseCase';
import { DeleteGoodDeedCommand } from '../application/DeleteGoodDeedUseCase';
import { FindAllGoodDeedsByUserIdQuery } from '../application/FindAllGoodDeedsByUserIdUseCase';
import { FindAllGoodDeedsForCurrentUserQuery } from '../application/FindAllGoodDeedsForCurrentUserUseCase';
import { UpdateGoodDeedCommand } from '../application/UpdateGoodDeedUseCase';
import { CreateGoodDeedDto, UpdateGoodDeedDto } from '../domain/goodDeed.dto';
import { ViewGoodDeedModel } from '../domain/goodDeed.types';

@ApiTags('goodDeeds')
@Controller('goodDeeds')
export class GoodDeedsController {

    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Get all own good deeds'})
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    async findAllGoodDeedsForCurrentUser(@Req() req, @Query() query: PaginatorDto){
        return this.queryBus.execute(new FindAllGoodDeedsForCurrentUserQuery(req.user.userId, query))
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(':id/user')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Get all good deeds other user if it user in your friend-list'})
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    @ApiResponse({ status: 403, description: 'This user not in your friend-list'})
    @ApiResponse({ status: 404, description: 'This user not found'})
    async findAllGoodDeedsByUserId(@Param('id') id: string, @Query() query: PaginatorDto){
        return this.queryBus.execute(new FindAllGoodDeedsByUserIdQuery(id, query))
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiResponse({ status: 201, description: 'Good deed has been successfully created.', type: ViewGoodDeedModel})
    @ApiResponseError(ErrorSwagger)
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    async createGoodDeed(@Body() createGoodDeedDto: CreateGoodDeedDto, @Req() req){
        return this.commandBus.execute(new CreateGoodDeedCommand(createGoodDeedDto, req.user.userId))
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @HttpCode(204)
    @ApiResponse({ status: 204, description: 'Good deed has been successfully updated.'})
    @ApiResponseError(ErrorSwagger)
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    @ApiResponse({ status: 403, description: 'Good deed for update is not your'})
    @ApiResponse({ status: 404, description: 'Good deed for update is not found'})
    async updateGoodDeed(@Body() updateGoodDeedDto: UpdateGoodDeedDto, @Req() req, @Param('id') id: string){
        return this.commandBus.execute(new UpdateGoodDeedCommand(updateGoodDeedDto, req.user.userId, id))
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @HttpCode(204)
    @ApiResponse({ status: 204, description: 'GoodDeed has been successfully deleted'})
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    @ApiResponse({ status: 403, description: 'Good deed for delete is not your'})
    @ApiResponse({ status: 404, description: 'Good deed for delete is not found'})
    async deleteGoodDeed(@Req() req, @Param('id') id: string){
        return this.commandBus.execute(new DeleteGoodDeedCommand(req.user.userId, id))
    }
}