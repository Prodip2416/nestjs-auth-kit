import { Inject, Injectable } from '@nestjs/common';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokensProvider } from './refresh-tokens.provider';
import { RefreshTokenDTO } from '../dtos/refresh-token.dto';
import { SignInDto } from '../dtos/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(SignInProvider)
    private readonly signInProvider: SignInProvider,
    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    // console.log(signInDto);
    return await this.signInProvider.signIn(signInDto);
  }

  public async refreshTokens(refreshTokenDto: RefreshTokenDTO) {
    return await this.refreshTokensProvider.refreshTokens(refreshTokenDto);
  }
}
