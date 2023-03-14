import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginatorDto } from '../../../helpers/common/types/paginator.dto';
import { ApiResponseError } from '../../../helpers/common/swagger-decorators/error-api-swagger';
import { ApiOkResponsePaginated } from '../../../helpers/common/swagger-decorators/paginated-api-swagger';
import { ErrorSwagger } from '../../../helpers/common/types/errored';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateFriendshipCommand } from '../application/CreateFriendshipUseCase';
import { DeleteCurrentUserCommand } from '../application/DeleteCurrentUserUseCase';
import { FindAllUsersQuery } from '../application/FindAllUsersUseCase';
import { UpdateCurrentUserCommand } from '../application/UpdateCurrentUserUseCase';
import { UpdateCurrentUserDto } from '../domain/user.dto';
import { PaginationDto, ViewUserModel } from '../domain/user.types';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOkResponsePaginated(ViewUserModel)
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    async findAllUsers(@Query() query: PaginatorDto): Promise<PaginationDto<ViewUserModel>>{
        return this.queryBus.execute(new FindAllUsersQuery(query))
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('friendship/:id')
    @ApiResponse({ status: 201, description: 'The friendship has been successfully created.'})
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    @ApiResponse({ status: 404, description: 'User for friendship Not found'})
    async createFriendship(@Param('id') id: string, @Req() req){
        return this.commandBus.execute(new CreateFriendshipCommand(req.user.userId, id))
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put()
    @HttpCode(204)
    @ApiResponse({ status: 204, description: 'Own user has been successfully updated.'})
    @ApiResponseError(ErrorSwagger)
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    async updateCurrentUser(@Body() updateCurrentUserDto: UpdateCurrentUserDto, @Req() req){
        return this.commandBus.execute(new UpdateCurrentUserCommand(updateCurrentUserDto, req.user.userId))
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete()
    @HttpCode(204)
    @ApiResponse({ status: 204, description: 'Own user has been successfully deleted'})
    @ApiResponse({ status: 401, description: 'Not authorized.'})
    async deleteCurrentUser(@Req() req){
        return this.commandBus.execute(new DeleteCurrentUserCommand(req.user.userId))
    }
}