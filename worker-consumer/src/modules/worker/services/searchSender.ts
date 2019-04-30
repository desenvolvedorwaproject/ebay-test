import { Injectable } from '@nestjs/common';
import { SenderEmailService } from 'modules/email/services/sender';
import { ISearchDefinition } from 'schema/searchDefinition';

import { EbayApiService } from './ebay';

@Injectable()
export class SearchSenderService {
  constructor(
    private ebayService: EbayApiService,
    private emailService: SenderEmailService
  ) { }

  public async sendEmail(searchDefinition: ISearchDefinition): Promise<string> {
    const items = await this.ebayService.search(searchDefinition.phrase, searchDefinition.orderBy, searchDefinition.numberOfItems);

    return this.emailService.send(searchDefinition.email, 'Ebay Search', 'ebay', {
      phrase: searchDefinition.phrase,
      interval: searchDefinition.interval,
      items
    });
  }
}