import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositoty } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepositoty)
    private userRepository: UserRepositoty,
  ) {}

  signUp(authcredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authcredentialsDto);
  }

  async signIn(authcredentialsDto: AuthCredentialsDto): Promise<string> {
    const result = await this.userRepository.validateUserPassword(
      authcredentialsDto,
    );

    if (!result) {
      throw new UnauthorizedException({
        success: false,
        message: 'Invalid credentials',
      });
    }
    return result;
  }
}
