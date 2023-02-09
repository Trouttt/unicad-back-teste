import {
  Controller,
  Get,
  Request,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserEntity } from './entities/user.entity';

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
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('Users')
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({
    summary: 'Create user',
    description: 'Create User endpoint. Create a new user',
  })
  @ApiCreatedResponse({ description: 'Created', type: UserEntity })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Find user',
    description: 'Find User endpoint. Find a user',
  })
  @ApiCreatedResponse({ description: 'Created', type: UserEntity })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.findOneById(id);
  }

  @ApiOperation({
    summary: 'update user',
    description: 'Update user endpoint. Update one user on the system.',
  })
  @ApiOkResponse({ description: 'Updated', type: UserEntity })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(id, updatePostDto);
  }

  @ApiOperation({
    summary: 'Auth user endpoint',
  })
  @ApiOkResponse({ description: 'Sign in', type: UserEntity })
  @Post('auth')
  signIn(@Body() body: SignInDto): Promise<{ access_token: string }> {
    return this.usersService.signIn(body);
  }
  //@UseGuards(JwtAuthGuard)
}
