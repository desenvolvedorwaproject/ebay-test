import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { QueueService } from 'modules/queue/services/queue';

import { SearchSenderService } from './searchSender';

@Injectable()
export class StarterService implements OnApplicationBootstrap {
  constructor(
    private qeueService: QueueService,
    private searchSenderService: SearchSenderService
  ) { }

  public onApplicationBootstrap(): void {
    this.qeueService.listen(async message => {
      const data = JSON.parse(message.content.toString());

      console.log('NEW MESSAGE: ' + data._id);
      console.time('NEW MESSAGE: ' + data._id);
      this.searchSenderService.sendEmail(data);
      console.timeEnd('NEW MESSAGE: ' + data._id);
    });
  }
}