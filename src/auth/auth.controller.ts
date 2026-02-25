import { Body, Controller } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { LoginDTO } from './dtos/login.post.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  public async login(@Body() loginDTO: LoginDTO) {
    return await this.authService.login(loginDTO);
  }
}
