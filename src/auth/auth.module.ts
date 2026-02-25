import { Module } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { HashingModule } from './hashing/hashing.module';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [AuthService],
  imports: [HashingModule, UsersModule],
  controllers: [AuthController],
})
export class AuthModule {}
