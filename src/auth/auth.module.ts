import { Module } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { HashingModule } from './hashing/hashing.module';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './jwt-config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { ChangePasswordProvider } from './providers/change-password.provider';

@Module({
  providers: [
    AuthService,
    SignInProvider,
    GenerateTokensProvider,
    RefreshTokensProvider,
    ChangePasswordProvider
  ],
  imports: [
    HashingModule,
    UsersModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
