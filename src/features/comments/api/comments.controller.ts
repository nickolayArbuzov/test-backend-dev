import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateCommentForSpecificGoodDeedCommand } from '../application/CreateCommentForSpecificGoodDeedUseCase';
import { DeleteCommentByIdCommand } from '../application/DeleteCommentByIdUseCase';
import { UpdateCommentByIdCommand } from '../application/UpdateCommentByIdUseCase';
import { CreateCommentDto, UpdateCommentDto } from '../domain/comment.dto';

@Controller('comments')
export class CommentsController {

    constructor(
        private commandBus: CommandBus,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createCommentForSpecificGoodDeed(@Body() createCommentDto: CreateCommentDto, @Req() req){
        return await this.commandBus.execute(new CreateCommentForSpecificGoodDeedCommand(createCommentDto, req.user.userId))
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateCommentById(@Body() updateCommentDto: UpdateCommentDto, @Req() req, @Param('id') id: string){
        return await this.commandBus.execute(new UpdateCommentByIdCommand(updateCommentDto, req.user.userId, id))
    }

    @UseGuards(JwtAuthGuard) 
    @Delete(':id')
    async deleteCommentById(@Req() req, @Param('id') id: string){
        return await this.commandBus.execute(new DeleteCommentByIdCommand(req.user.userId, id))
    }
}