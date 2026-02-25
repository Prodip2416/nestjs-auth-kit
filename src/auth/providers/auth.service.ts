import { Injectable } from '@nestjs/common';
import { HashingService } from '../hashing/providers/hashing.service';
import { LoginDTO } from '../dtos/login.post.dto';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly userService: UsersService,
  ) {}

  public async login(loginDTO: LoginDTO) {
    const user = await this.userService.findOneByEmail(loginDTO.email);
    return true;
  }
}
