import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { COMMENT_ERRORS } from 'src/shared/helpers/responses/errors/comment-errors.helpers';
import { POST_ERRORS } from 'src/shared/helpers/responses/errors/post-errors.helpers';
import { USER_ERRORS } from 'src/shared/helpers/responses/errors/user-errors.helpers';
import { COMMENT_SUCESSFULL } from 'src/shared/helpers/responses/successfuls/comment-successfuls.helpers';
import { Repository } from 'typeorm';
import { PostEntity } from '../posts/entities/post.entity';
import { PostsService } from '../posts/posts.service';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly userService: UsersService,
    private readonly postService: PostsService,
  ) { }
  async create(
    token: string,
    createCommentDto: CreateCommentDto,
  ): Promise<CommentEntity> {
    let user: UserEntity | null = null;
    let post: PostEntity | null = null;
    let comment: CommentEntity | null = null;

    user = await this.userService.verifyIfUserExist(token);

    if (!user) {
      throw new NotFoundException(USER_ERRORS.userDoesntExistWithThisId);
    }

    post = await this.postService.findOne(createCommentDto.post_id);

    if (!post) {
      throw new NotFoundException(POST_ERRORS.postDoesntExistWithThisId);
    }

    delete createCommentDto.post_id;

    comment = this.commentRepository.create(createCommentDto);

    comment.user = user;
    comment.post = post;

    return this.commentRepository.save(comment);
  }

  async findAll() {
    return this.commentRepository.find();
  }

  async findOne(id: string) {
    return this.commentRepository.findOne({ where: { id } });
  }

  async update(id: string, token: string, updateCommentDto: UpdateCommentDto) {
    let user: UserEntity | null = null;
    let comment: CommentEntity | null = null;

    user = await this.userService.verifyIfUserExist(token);

    if (!user) {
      throw new NotFoundException(USER_ERRORS.userDoesntExistWithThisId);
    }

    comment = await this.findOne(id);

    if (!comment) {
      throw new NotFoundException(COMMENT_ERRORS.commentDoesntExistWithThisId);
    }

    if (user.id !== comment.user.id) {
      throw new BadRequestException(COMMENT_ERRORS.onlyCommentOwnerCanEdit);
    }

    return this.commentRepository.save({ ...comment, ...updateCommentDto });
  }

  async remove(id: string, token: string) {
    let user: UserEntity | null = null;
    let comment: CommentEntity | null = null;

    user = await this.userService.verifyIfUserExist(token);

    if (!user) {
      throw new NotFoundException(USER_ERRORS.userDoesntExistWithThisId);
    }

    comment = await this.findOne(id);

    if (!comment) {
      throw new NotFoundException(COMMENT_ERRORS.commentDoesntExistWithThisId);
    }

    if (user.id !== comment.user.id && user.id !== comment.post.user.id) {
      throw new BadRequestException(
        COMMENT_ERRORS.onlyCommentOwnerOrPostOwnerCanDelete,
      );
    }

    await this.commentRepository.softRemove(comment);

    return { message: COMMENT_SUCESSFULL.commentRemovedWithSuccessful };
  }
}
