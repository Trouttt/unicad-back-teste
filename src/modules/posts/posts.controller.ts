import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UserEntity } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostEntity } from './entities/post.entity';

@ApiTags('Posts')
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@ApiBearerAuth('jwt-token')
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @ApiOperation({
    summary: 'Create post',
    description: 'Create post endpoint. Create a new post',
  })
  @ApiCreatedResponse({ description: 'Created', type: PostEntity })
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req) {
    return this.postsService.create(req.headers.authorization, createPostDto);
  }

  @ApiOperation({
    summary: 'FindAll post',
    description: 'FindAll post endpoint. List all posts on the system.',
  })
  @ApiOkResponse({ description: 'Found', type: PostEntity })
  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @ApiOperation({
    summary: 'findOne post',
    description: 'FindOne post endpoint. List one post on the system.',
  })
  @ApiOkResponse({ description: 'Found', type: PostEntity })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }

  @ApiOperation({
    summary: 'update post',
    description: 'Update post endpoint. Update one post on the system.',
  })
  @ApiOkResponse({ description: 'Updated', type: PostEntity })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req,
  ): Promise<PostEntity> {
    return this.postsService.update(
      id,
      updatePostDto,
      req.headers.authorization,
    );
  }

  @ApiOperation({
    summary: 'delete post',
    description: 'Delete post endpoint. delete one post on the system.',
  })
  @ApiOkResponse({ description: 'Deleted' })
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req): Promise<{ message: string }> {
    return this.postsService.remove(id, req.headers.authorization);
  }
}
