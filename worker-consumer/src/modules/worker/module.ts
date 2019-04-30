import { HttpModule, Module } from '@nestjs/common';
import { EmailModule } from 'modules/email/module';
import { QueueModule } from 'modules/queue/module';

import { EbayApiService } from './services/ebay';
import { SearchSenderService } from './services/searchSender';
import { StarterService } from './services/starter';

@Module({
  imports: [HttpModule, QueueModule, EmailModule],
  providers: [StarterService, EbayApiService, SearchSenderService]
})
export class WorkerModule { }