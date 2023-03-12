import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateCommentForSpecificGoodDeedCommand } from '../application/CreateCommentForSpecificGoodDeedUseCase';
import { DeleteCommentByIdCommand } from '../application/DeleteCommentByIdUseCase';
import { UpdateCommentByIdCommand } from '../application/UpdateCommentByIdUseCase';
import { CreateCommentDto, UpdateCommentDto } from '../domain/comment.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {

    constructor(
        private commandBus: CommandBus,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Sending incorrect data.'})
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    async createCommentForSpecificGoodDeed(@Body() createCommentDto: CreateCommentDto, @Req() req){
        return await this.commandBus.execute(new CreateCommentForSpecificGoodDeedCommand(createCommentDto, req.user.userId))
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 400, description: 'Sending incorrect data.'})
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    @ApiResponse({ status: 404, description: 'Not found or forbidden.'})
    async updateCommentById(@Body() updateCommentDto: UpdateCommentDto, @Req() req, @Param('id') id: string){
        return await this.commandBus.execute(new UpdateCommentByIdCommand(updateCommentDto, req.user.userId, id))
    }

    @UseGuards(JwtAuthGuard) 
    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Comment has been successfully deleted'})
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    @ApiResponse({ status: 404, description: 'Not found or forbidden.'})
    async deleteCommentById(@Req() req, @Param('id') id: string){
        return await this.commandBus.execute(new DeleteCommentByIdCommand(req.user.userId, id))
    }
}