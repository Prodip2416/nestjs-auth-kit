import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenDTO } from './dtos/refresh-token.dto';
import { REQUEST_USER_KEY } from './constants/auth.constants';
import { ActiveUserData } from './interfaces/active-user-data.interface';
import { ChangePasswordDto } from './dtos/chnage-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  public async login(@Body() loginDTO: SignInDto) {
    return await this.authService.signIn(loginDTO);
  }

  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDTO) {
    return this.authService.refreshTokens(refreshTokenDto);
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  changePassword(@Req() req: Request, @Body() changePasswordDto: ChangePasswordDto) {
    const user = req[REQUEST_USER_KEY] as ActiveUserData;
    return this.authService.changePassword(user.sub, changePasswordDto);
  }
}
