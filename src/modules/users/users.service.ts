import * as bcrypt from 'bcrypt';

import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { USER_ERRORS } from '../../shared/helpers/responses/errors/user-errors.helpers';
import { AuthService } from '../auth/auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/shared/constants/jwt-secret';

@Injectable()
export class UsersService {
  private readonly salt: string;
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    private jwtService: JwtService,
  ) { }

  async signIn(authDto: SignInDto): Promise<{ access_token: string }> {
    return this.authService.signIn(authDto);
  }
  async create(createUserDto: CreateUserDto) {
    const userAlreadyExist = await this.findOneByEmail(createUserDto.email);

    if (userAlreadyExist) {
      throw new BadRequestException(USER_ERRORS.userAlreadyExist);
    }
    const user: CreateUserDto = this.userRepository.create(createUserDto);

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(createUserDto.password, salt);

    user.password = hash;

    return this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneById(id);

    if (!user) {
      throw new BadRequestException(USER_ERRORS.userDoesntExistWithThisId);
    }

    const emailAlreadyInUse = await this.findOneByEmail(updateUserDto.email);

    if (emailAlreadyInUse) {
      throw new BadRequestException(USER_ERRORS.emailAlreadyExist);
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(updateUserDto.password, salt);

    updateUserDto.password = hash;
    return this.userRepository.save({ ...user, ...updateUserDto });
  }

  async findOneById(id: string) {
    return this.userRepository.findOne({
      where: [{ id }, { email: id }],
    });
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      withDeleted: true,
    });
  }

  async decodeTokenToGetUserId(token: string): Promise<string> {
    const authorization: string = token.split(' ')[1];
    const user_id: string = this.jwtService.verify(authorization, {
      secret: jwtConstants.secret,
    }).id;

    return user_id;
  }

  async verifyIfUserExist(token: string): Promise<UserEntity | null> {
    const user_id: string = await this.decodeTokenToGetUserId(token);
    const user: UserEntity = await this.findOneById(user_id);

    if (!user) {
      return null;
    }

    return user;
  }
}
