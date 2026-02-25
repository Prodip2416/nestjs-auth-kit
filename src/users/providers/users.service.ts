import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { HashingService } from 'src/auth/hashing/providers/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  public async createUser(createUserDTO: CreateUserDTO) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDTO.email },
      });

      if (existingUser) {
        throw new BadRequestException(
          'Email address is already in use. Please use a different one.',
        );
      }

      // Create a new user instance
      const newUser = this.userRepository.create({
        ...createUserDTO,
        password: await this.hashingService.hashPassword(
          createUserDTO.password,
        ),
      });
      // Save the new user to the database
      await this.userRepository.save(newUser);

      return newUser;
    } catch (error) {
      // console.error('Error during user creation:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'There was an issue creating the user. Please try again later.',
      );
    }
  }

  public async findOneByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });

      // If no user is found, throw a NotFoundException
      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }

      return user;
    } catch (error) {
      // console.error(`Error finding user by email: ${email}`, error);
      throw new InternalServerErrorException(
        'An error occurred while retrieving the user',
      );
    }
  }
}
