import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async validateUserPassword(
    authcredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authcredentialsDto;
    const user = this.findOne({ username });
    const found = await (await user).validatePassword(password);
    if (user && found) {
      return (await user).username;
    } else {
      return null;
    }
  }

  async signUp(authcredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authcredentialsDto;
    const salt = await bcrypt.genSalt();
    const user = new User();
    user.username = username;
    user.salt = salt;
    user.password = await this.hasPassword(password, salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code == 23505) {
        throw new ConflictException({
          success: false,
          message: 'Username already exists',
        });
      } else {
        throw new InternalServerErrorException({
          success: false,
          message: 'Database went wrong',
        });
      }
    }
  }
  private async hasPassword(password: string, salt): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
