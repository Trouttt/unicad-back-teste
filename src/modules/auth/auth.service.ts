import * as bcrypt from 'bcrypt';

import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AUTH_ERRORS } from '../../shared/helpers/responses/errors/auth-errors.helpers';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignInDto } from '../users/dto/sign-in.dto';
import { jwtConstants } from 'src/shared/constants/jwt-secret';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    private jwtService: JwtService,
  ) { }

  async signIn(user: SignInDto) {
    const verifyIfUserIsValid = await this.validateUser(
      user.email,
      user.password,
    );

    if (verifyIfUserIsValid) {
      const payload = {
        id: verifyIfUserIsValid.id,
        email: user.email,
        sub: verifyIfUserIsValid.id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new BadRequestException(AUTH_ERRORS.userDoesntExist);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException(AUTH_ERRORS.userDoesntExist);
    }

    const verifiedPassword = await bcrypt.compare(password, user.password);

    if (!verifiedPassword) {
      throw new BadRequestException(AUTH_ERRORS.userDoesntExist);
    }
    const { password: passwordd, ...result } = user;

    return result;
  }

  async decodeTokenToGetUserId(token: string): Promise<string> {
    const authorization: string = token.split(' ')[1];
    const user_id: string = this.jwtService.verify(authorization, {
      secret: jwtConstants.secret,
    }).id;

    return user_id;
  }
}
