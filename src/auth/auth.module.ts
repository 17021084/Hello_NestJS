import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UserRepositoty } from './user.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepositoty])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
