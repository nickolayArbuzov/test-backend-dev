import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateFriendshipCommand } from '../application/CreateFriendshipUseCase';
import { DeleteCurrentUserCommand } from '../application/DeleteCurrentUserUseCase';
import { FindAllUsersQuery } from '../application/FindAllUsersUseCase';
import { UpdateCurrentUserCommand } from '../application/UpdateCurrentUserUseCase';
import { UpdateCurrentUserDto } from '../domain/user.dto';

@Controller('users')
export class UsersController {

    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllUsers(){
        return this.queryBus.execute(new FindAllUsersQuery())
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id')
    async createFriendship(@Param('id') id: string, @Req() req){
        return this.commandBus.execute(new CreateFriendshipCommand(req.user.userId, id))
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async updateCurrentUser(@Body() updateCurrentUserDto: UpdateCurrentUserDto, @Req() req){
        return this.commandBus.execute(new UpdateCurrentUserCommand(updateCurrentUserDto, req.user.userId))
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteCurrentUser(@Req() req){
        return this.commandBus.execute(new DeleteCurrentUserCommand(req.user.userId))
    }
}