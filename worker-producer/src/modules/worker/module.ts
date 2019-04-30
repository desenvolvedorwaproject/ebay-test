import { Module } from '@nestjs/common';
import { DatabaseModule } from 'modules/database/module';
import { QueueModule } from 'modules/queue/module';

import { JobService } from './services/job';
import { SendToQueueService } from './services/sendToQueue';
import { StarterService } from './services/starter';

@Module({
  imports: [DatabaseModule, QueueModule],
  providers: [StarterService, JobService, SendToQueueService]
})
export class WorkerModule {
}