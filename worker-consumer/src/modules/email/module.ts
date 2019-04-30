import { Module } from '@nestjs/common';

import { SenderEmailService } from './services/sender';

@Module({
  providers: [SenderEmailService],
  exports: [SenderEmailService]
})
export class EmailModule { }
