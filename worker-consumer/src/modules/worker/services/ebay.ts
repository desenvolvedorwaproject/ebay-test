import { HttpService, Injectable } from '@nestjs/common';
import { IEbaySearchResponse, IEbaySearchResult } from 'interfaces/ebay';
import { EBAY_KEY } from 'settings';

@Injectable()
export class EbayApiService {
  constructor(
    private httpService: HttpService
  ) { }

  public async search(
    keyword: string,
    sortOrder: string,
    numberOfItems: number
  ): Promise<IEbaySearchResult[]> {
    const result = await this.httpService.get<IEbaySearchResponse>('http://svcs.ebay.com/services/search/FindingService/v1', {
      params: {
        'OPERATION-NAME': 'findItemsByKeywords',
        'SECURITY-APPNAME': EBAY_KEY,
        'RESPONSE-DATA-FORMAT': 'JSON',
        keywords: keyword,
        sortOrder,
        'paginationInput.entriesPerPage': numberOfItems
      }
    }).toPromise();

    return result.data.findItemsByKeywordsResponse[0].searchResult[0].item.map(item => {
      return {
        title: item.title[0],
        imageUrl: item.galleryURL[0],
        price: `${item.sellingStatus[0].convertedCurrentPrice[0]['@currencyId']} ${item.sellingStatus[0].convertedCurrentPrice[0].__value__}`,
        url: item.viewItemURL[0]
      } as IEbaySearchResult;
    });
  }
}