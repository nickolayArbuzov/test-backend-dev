import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseError } from '../../../helpers/common/swagger-decorators/error-api-swagger';
import { ErrorSwagger } from '../../../helpers/common/types/errored'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateCommentForSpecificGoodDeedCommand } from '../application/CreateCommentForSpecificGoodDeedUseCase';
import { DeleteCommentByIdCommand } from '../application/DeleteCommentByIdUseCase';
import { UpdateCommentByIdCommand } from '../application/UpdateCommentByIdUseCase';
import { CreateCommentDto, UpdateCommentDto } from '../domain/comment.dto';
import { ViewCommentModel } from '../domain/comment.types';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {

    constructor(
        private commandBus: CommandBus,
    ) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiResponse({ status: 201, description: 'The comment has been successfully created.', type: ViewCommentModel})
    @ApiResponseError(ErrorSwagger)
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    @ApiResponse({ status: 403, description: 'Create comment for good deed of user, who not in your friend-list.'})
    @ApiResponse({ status: 404, description: 'Create comment for good deed which not found'})
    async createCommentForSpecificGoodDeed(@Body() createCommentDto: CreateCommentDto, @Req() req){
        return await this.commandBus.execute(new CreateCommentForSpecificGoodDeedCommand(createCommentDto, req.user.userId))
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @HttpCode(204)
    @ApiResponse({ status: 204, description: 'The comment has been successfully updated.'})
    @ApiResponseError(ErrorSwagger)
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    @ApiResponse({ status: 403, description: 'Not your comment'})
    @ApiResponse({ status: 404, description: 'Not found comment for update.'})
    async updateCommentById(@Body() updateCommentDto: UpdateCommentDto, @Req() req, @Param('id') id: string){
        return await this.commandBus.execute(new UpdateCommentByIdCommand(updateCommentDto, req.user.userId, id))
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard) 
    @Delete(':id')
    @HttpCode(204)
    @ApiResponse({ status: 204, description: 'Comment has been successfully deleted'})
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    @ApiResponse({ status: 403, description: 'Not your comment.'})
    @ApiResponse({ status: 404, description: 'Not found comment for delete.'})
    async deleteCommentById(@Req() req, @Param('id') id: string){
        return await this.commandBus.execute(new DeleteCommentByIdCommand(req.user.userId, id))
    }
}