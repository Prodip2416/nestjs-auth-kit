import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { CreateUserDTO } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  public async findAll() {
    return await this.userService.findAll();
  }

  @Post('create')
  public async create(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.createUser(createUserDTO);
  }


}
