import { Inject, Injectable } from '@nestjs/common';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokensProvider } from './refresh-tokens.provider';
import { RefreshTokenDTO } from '../dtos/refresh-token.dto';
import { SignInDto } from '../dtos/sign-in.dto';
import { ChangePasswordDto } from '../dtos/chnage-password.dto';
import { ChangePasswordProvider } from './change-password.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(SignInProvider)
    private readonly signInProvider: SignInProvider,
    private readonly refreshTokensProvider: RefreshTokensProvider,
    private readonly changePasswordProvider: ChangePasswordProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    // console.log(signInDto);
    return await this.signInProvider.signIn(signInDto);
  }

  public async refreshTokens(refreshTokenDto: RefreshTokenDTO) {
    return await this.refreshTokensProvider.refreshTokens(refreshTokenDto);
  }

  public async changePassword(
    userId: number,
    changePasswordDto: ChangePasswordDto,
  ) {
    return await this.changePasswordProvider.ChangePassword(
      userId,
      changePasswordDto,
    );
  }
}
