import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateFriendshipCommand } from '../application/CreateFriendshipUseCase';
import { DeleteCurrentUserCommand } from '../application/DeleteCurrentUserUseCase';
import { FindAllUsersQuery } from '../application/FindAllUsersUseCase';
import { UpdateCurrentUserCommand } from '../application/UpdateCurrentUserUseCase';
import { UpdateCurrentUserDto } from '../domain/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    async findAllUsers(){
        return this.queryBus.execute(new FindAllUsersQuery())
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    @ApiResponse({ status: 404, description: 'Not found or forbidden.'})
    async createFriendship(@Param('id') id: string, @Req() req){
        return this.commandBus.execute(new CreateFriendshipCommand(req.user.userId, id))
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Sending incorrect data.'})
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    async updateCurrentUser(@Body() updateCurrentUserDto: UpdateCurrentUserDto, @Req() req){
        return this.commandBus.execute(new UpdateCurrentUserCommand(updateCurrentUserDto, req.user.userId))
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    @ApiResponse({ status: 200, description: 'Current user has been successfully deleted'})
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    async deleteCurrentUser(@Req() req){
        return this.commandBus.execute(new DeleteCurrentUserCommand(req.user.userId))
    }
}