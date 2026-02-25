import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { CreateUserDTO } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  public async create(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.createUser(createUserDTO);
  }
}
