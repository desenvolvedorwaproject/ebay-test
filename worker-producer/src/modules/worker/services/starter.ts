import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { INTERVALS, IS_DEV } from 'settings';

import { JobService } from './job';
import { SendToQueueService } from './sendToQueue';

@Injectable()
export class StarterService implements OnApplicationBootstrap {
  constructor(
    private jobService: JobService,
    private sendToQueueService: SendToQueueService
  ) { }

  public onApplicationBootstrap(): void {
    INTERVALS.map(interval => {
      this.jobService.register(
        `EBAY: SEND TO QUEUE - ${interval} minutes`,
        `*/${IS_DEV ? 1 : interval} * * * *`,
        () => this.sendToQueueService.proccess(interval));
    });
  }
}