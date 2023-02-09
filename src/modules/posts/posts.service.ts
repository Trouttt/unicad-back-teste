import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { POST_ERRORS } from 'src/shared/helpers/responses/errors/post-errors.helpers';
import { USER_ERRORS } from 'src/shared/helpers/responses/errors/user-errors.helpers';
import { POST_SUCESSFULL } from 'src/shared/helpers/responses/successfuls/post-successfuls.helpers';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,

    private readonly userService: UsersService,
  ) { }
  async create(token: string, createPostDto: CreatePostDto) {
    const user_id: string = await this.userService.decodeTokenToGetUserId(
      token,
    );
    const user: UserEntity = await this.userService.findOneById(user_id);

    if (!user) {
      throw new NotFoundException(USER_ERRORS.userDoesntExistWithThisId);
    }

    const post: PostEntity = this.postRepository.create(createPostDto);

    post.user = user;

    return this.postRepository.save(post);
  }

  async findAll() {
    return this.postRepository.find({ relations: ['user', 'comment'] });
  }

  async findOne(id: string) {
    return this.postRepository.findOne({ relations: ['user'], where: { id } });
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    token: string,
  ): Promise<PostEntity> {
    const post: PostEntity = await this.findOne(id);

    if (!post) {
      throw new NotFoundException(
        `${POST_ERRORS.postDoesntExistWithThisId} ${id}`,
      );
    }

    const user_id = await this.userService.decodeTokenToGetUserId(token);

    if (post.user.id !== user_id) {
      throw new BadRequestException(
        POST_ERRORS.postDoenstUpdateWithDifferentUser,
      );
    }

    return this.postRepository.save({ ...post, ...updatePostDto });
  }

  async remove(id: string, token: string): Promise<{ message: string }> {
    const post: PostEntity = await this.findOne(id);

    if (!post) {
      throw new NotFoundException(
        `${POST_ERRORS.postDoesntExistWithThisId} ${id}`,
      );
    }

    const user_id = await this.userService.decodeTokenToGetUserId(token);

    if (post.user.id !== user_id) {
      throw new BadRequestException(
        POST_ERRORS.postDoenstDeleteWithDifferentUser,
      );
    }

    await this.postRepository.softRemove(post);

    return { message: POST_SUCESSFULL.postRemovedWithSuccessful };
  }
}
