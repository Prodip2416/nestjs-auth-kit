import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from '../hashing/providers/hashing.provider';
import { ChangePasswordDto } from '../dtos/chnage-password.dto';

@Injectable()
export class ChangePasswordProvider {
  constructor(
    private readonly userService: UsersService,
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async ChangePassword(userId: number, changePasswordDto: ChangePasswordDto) {
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch = await this.hashingProvider.comparePassword(
      changePasswordDto.password,
      user.password,
    );
    if (!isMatch) {
      throw new BadRequestException("Password doesn't match");
    }

    return await this.userService.updateUserPasswordById(
      user.id,
      changePasswordDto.newPassword,
    );
  }
}
