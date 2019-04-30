import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueueService } from 'modules/queue/services/queue';
import { Model } from 'mongoose';
import { ISearchDefinition, SearchDefinitionToken } from 'schema/searchDefinition';

@Injectable()
export class SendToQueueService {
  constructor(
    @InjectModel(SearchDefinitionToken) private searchDefinitionModel: Model<ISearchDefinition>,
    private queueService: QueueService
  ) { }

  public async proccess(interval: number): Promise<any> {
    const items = await this.searchDefinitionModel.find({ interval }).exec();
    const promises = items.map(item => this.queueService.sendToQueue(item));

    return Promise.all(promises);
  }
}