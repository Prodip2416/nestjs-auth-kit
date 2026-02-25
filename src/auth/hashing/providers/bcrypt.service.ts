import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';

@Injectable()
export class BcryptService implements HashingService {
  public async hashPassword(data: string | Buffer): Promise<string> {
    // Generate the salt
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(data, salt);
  }

  public async comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean> {
    return await bcrypt.compare(data, encrypted);
  }
}
