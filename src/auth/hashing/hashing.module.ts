import { Module } from '@nestjs/common';
import { BcryptService } from './providers/bcrypt.service';
import { HashingService } from './providers/hashing.service';

@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
  exports: [HashingService],
})
export class HashingModule {}
