import { EbayApiService } from './ebay';

describe('Worker/EbayApiService', () => {
  let service: EbayApiService;
  let httpModule: any;

  beforeAll(async () => {
    httpModule = {
      get: () => httpModule,
      toPromise: () => Promise.resolve(),
    };

    service = new EbayApiService(httpModule);
  });

  describe('list', () => {
    it('should an empty array', () => {
      jest.spyOn(httpModule, 'toPromise').mockImplementation(() => {
        return {
          // tslint:disable-next-line: max-line-length
          data: { findItemsByKeywordsResponse: [{ ack: ['Success'], version: ['1.13.0'], timestamp: ['2019-04-24T03:55:29.830Z'], searchResult: [{ '@count': '3', item: [{ itemId: ['163654586117'], title: ['1Set Front\/Back Clear Film HD LCD Screen Protector Cover For iphone 6 4.7"'], globalId: ['EBAY-US'], primaryCategory: [{ categoryId: ['58540'], categoryName: ['Screen Protectors'] }], galleryURL: ['http:\/\/thumbs2.ebaystatic.com\/m\/mACwI8Sxa5D6YkYt7ZtY_Ag\/140.jpg'], viewItemURL: ['http:\/\/www.ebay.com\/itm\/1Set-Front-Back-Clear-Film-HD-LCD-Screen-Protector-Cover-iphone-6-4-7-\/163654586117'], paymentMethod: ['PayPal'], autoPay: ['false'], location: ['China'], country: ['CN'], shippingInfo: [{ shippingServiceCost: [{ '@currencyId': 'USD', __value__: '0.0' }], shippingType: ['Free'], shipToLocations: ['Worldwide'], expeditedShipping: ['false'], oneDayShippingAvailable: ['false'], handlingTime: ['3'] }], sellingStatus: [{ currentPrice: [{ '@currencyId': 'USD', __value__: '0.01' }], convertedCurrentPrice: [{ '@currencyId': 'USD', __value__: '0.01' }], bidCount: ['1'], sellingState: ['Active'], timeLeft: ['P0DT22H3M28S'] }], listingInfo: [{ bestOfferEnabled: ['false'], buyItNowAvailable: ['false'], startTime: ['2019-04-18T01:58:57.000Z'], endTime: ['2019-04-25T01:58:57.000Z'], listingType: ['Auction'], gift: ['false'], watchCount: ['1'] }], returnsAccepted: ['true'], condition: [{ conditionId: ['1000'], conditionDisplayName: ['New'] }], isMultiVariationListing: ['false'], topRatedListing: ['false'] }, { itemId: ['293062104266'], title: ['360° Protective Phone Case For i Phone 6s 6 with Screen Protector Rose Gold'], globalId: ['EBAY-US'], primaryCategory: [{ categoryId: ['20349'], categoryName: ['Cases, Covers & Skins'] }], galleryURL: ['http:\/\/thumbs3.ebaystatic.com\/m\/mUQBEzRKA3RFxMC1LEh5PTQ\/140.jpg'], viewItemURL: ['http:\/\/www.ebay.com\/itm\/360-Protective-Phone-Case-Phone-6s-6-Screen-Protector-Rose-Gold-\/293062104266'], paymentMethod: ['PayPal'], autoPay: ['false'], location: ['China'], country: ['CN'], shippingInfo: [{ shippingServiceCost: [{ '@currencyId': 'USD', __value__: '0.0' }], shippingType: ['Free'], shipToLocations: ['Worldwide'], expeditedShipping: ['false'], oneDayShippingAvailable: ['false'], handlingTime: ['5'] }], sellingStatus: [{ currentPrice: [{ '@currencyId': 'USD', __value__: '0.01' }], convertedCurrentPrice: [{ '@currencyId': 'USD', __value__: '0.01' }], bidCount: ['1'], sellingState: ['Active'], timeLeft: ['P2DT23H6M53S'] }], listingInfo: [{ bestOfferEnabled: ['false'], buyItNowAvailable: ['false'], startTime: ['2019-04-24T03:02:22.000Z'], endTime: ['2019-04-27T03:02:22.000Z'], listingType: ['Auction'], gift: ['false'] }], returnsAccepted: ['true'], condition: [{ conditionId: ['1000'], conditionDisplayName: ['New'] }], isMultiVariationListing: ['false'], topRatedListing: ['false'] }, { itemId: ['372656998688'], title: ['Mini Selfie Stick Extendable Monopod Holder For iPhone 6 Plus No Color Choice'], globalId: ['EBAY-US'], primaryCategory: [{ categoryId: ['35190'], categoryName: ['Mounts & Holders'] }], galleryURL: ['http:\/\/thumbs1.ebaystatic.com\/m\/mlLLP5wNgpIDO4gH2WkGX4g\/140.jpg'], viewItemURL: ['http:\/\/www.ebay.com\/itm\/Mini-Selfie-Stick-Extendable-Monopod-Holder-iPhone-6-Plus-No-Color-Choice-\/372656998688'], paymentMethod: ['PayPal'], autoPay: ['false'], location: ['China'], country: ['CN'], shippingInfo: [{ shippingServiceCost: [{ '@currencyId': 'USD', __value__: '0.0' }], shippingType: ['Free'], shipToLocations: ['Worldwide'], expeditedShipping: ['false'], oneDayShippingAvailable: ['false'], handlingTime: ['5'] }], sellingStatus: [{ currentPrice: [{ '@currencyId': 'USD', __value__: '0.01' }], convertedCurrentPrice: [{ '@currencyId': 'USD', __value__: '0.01' }], bidCount: ['1'], sellingState: ['Active'], timeLeft: ['P3DT1H56M2S'] }], listingInfo: [{ bestOfferEnabled: ['false'], buyItNowAvailable: ['false'], startTime: ['2019-04-22T05:51:31.000Z'], endTime: ['2019-04-27T05:51:31.000Z'], listingType: ['Auction'], gift: ['false'], watchCount: ['1'] }], returnsAccepted: ['true'], condition: [{ conditionId: ['1000'], conditionDisplayName: ['New'] }], isMultiVariationListing: ['false'], topRatedListing: ['false'] }] }], paginationOutput: [{ pageNumber: ['1'], entriesPerPage: ['3'], totalPages: ['1665641'], totalEntries: ['4996922'] }], itemSearchURL: ['http:\/\/www.ebay.com\/sch\/i.html?_nkw=iphone+6&_ddo=1&_ipg=3&_pgn=1&_sop=15'] }] }
        };
      });

      return service.search('teste', '', 3).then(result => {
        expect(result).toEqual([{
          title: '1Set Front/Back Clear Film HD LCD Screen Protector Cover For iphone 6 4.7"',
          imageUrl: 'http://thumbs2.ebaystatic.com/m/mACwI8Sxa5D6YkYt7ZtY_Ag/140.jpg',
          price: 'USD 0.01',
          url: 'http://www.ebay.com/itm/1Set-Front-Back-Clear-Film-HD-LCD-Screen-Protector-Cover-iphone-6-4-7-/163654586117'
        }, {
          title: '360° Protective Phone Case For i Phone 6s 6 with Screen Protector Rose Gold',
          imageUrl: 'http://thumbs3.ebaystatic.com/m/mUQBEzRKA3RFxMC1LEh5PTQ/140.jpg',
          price: 'USD 0.01',
          url: 'http://www.ebay.com/itm/360-Protective-Phone-Case-Phone-6s-6-Screen-Protector-Rose-Gold-/293062104266'
        }, {
          title: 'Mini Selfie Stick Extendable Monopod Holder For iPhone 6 Plus No Color Choice',
          imageUrl: 'http://thumbs1.ebaystatic.com/m/mlLLP5wNgpIDO4gH2WkGX4g/140.jpg',
          price: 'USD 0.01',
          url: 'http://www.ebay.com/itm/Mini-Selfie-Stick-Extendable-Monopod-Holder-iPhone-6-Plus-No-Color-Choice-/372656998688'
        }]);
      });
    });
  });

});
