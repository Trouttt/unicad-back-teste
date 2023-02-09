import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@ApiTags('Comments')
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@ApiBearerAuth('jwt-token')
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @ApiOperation({
    summary: 'Create comment',
    description: 'Create comment endpoint. Create a new comment',
  })
  @ApiCreatedResponse({ description: 'Created', type: CommentEntity })
  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req,
  ): Promise<CommentEntity> {
    return this.commentsService.create(
      req.headers.authorization,
      createCommentDto,
    );
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(
      id,
      req.headers.authorization,
      updateCommentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.commentsService.remove(id, req.headers.authorization);
  }
}
