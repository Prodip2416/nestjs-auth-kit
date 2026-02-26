import { Module } from '@nestjs/common';
import { BcryptService } from './providers/bcrypt.service';
import { HashingProvider } from './providers/hashing.provider';

@Module({
  providers: [
    {
      provide: HashingProvider,
      useClass: BcryptService,
    },
  ],
  exports: [HashingProvider],
})
export class HashingModule {}
