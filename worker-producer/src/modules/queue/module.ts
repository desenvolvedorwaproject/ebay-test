import { Module } from '@nestjs/common';

import { QueueService } from './services/queue';

@Module({
  providers: [QueueService],
  exports: [QueueService]
})
export class QueueModule { }
