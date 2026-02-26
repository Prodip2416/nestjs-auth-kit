import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { HashingModule } from 'src/auth/hashing/hashing.module';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import { CreateUserProvider } from './providers/create-user.provider';
@Module({
  controllers: [UsersController],
  providers: [UsersService, FindOneUserByEmailProvider, CreateUserProvider],
  imports: [TypeOrmModule.forFeature([User]), HashingModule],
  exports: [UsersService],
})
export class UsersModule {}
