import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { HashingProvider } from 'src/auth/hashing/providers/hashing.provider';

@Injectable()
export class UpdateUserProvider {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @Inject(HashingProvider)
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async updateUserPassword(userId: number, password: string) {
    try {
      const hashedPassword = await this.hashingProvider.hashPassword(password);

      const updateResult = await this.usersRepository.update(
        { id: userId },
        { password: hashedPassword },
      );

      if (updateResult.affected === 0) {
        throw new NotFoundException('User not found');
      }

      return { ...updateResult, message: 'Password updated.' };
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }
  }
}
