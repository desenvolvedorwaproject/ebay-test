export interface IEbaySearchResult {
  title: string;
  imageUrl: string;
  price: string;
  url: string;
}

export interface IEbaySearchResponse {
  findItemsByKeywordsResponse: {
    ack: string[];
    version: string[];
    timestamp: string[];
    searchResult: {
      '@count': string;
      item: {
        itemId: string[];
        title: string[];
        globalId: string[];
        primaryCategory: {
          categoryId: string[];
          categoryName: string[];
        }[];
        galleryURL: string[];
        viewItemURL: string[];
        paymentMethod: string[];
        autoPay: string[];
        location: string[];
        country: string[];
        shippingInfo: {
          shippingServiceCost: {
            '@currencyId': string;
            __value__: string;
          }[];
          shippingType: string[];
          shipToLocations: string[];
          expeditedShipping: string[];
          oneDayShippingAvailable: string[];
          handlingTime: string[];
        }[];
        sellingStatus: {
          currentPrice: {
            '@currencyId': string;
            __value__: string;
          }[];
          convertedCurrentPrice: {
            '@currencyId': string;
            __value__: string;
          }[];
          bidCount: string[];
          sellingState: string[];
          timeLeft: string[];
        }[];
        listingInfo: {
          bestOfferEnabled: string[];
          buyItNowAvailable: string[];
          startTime: string[];
          endTime: string[];
          listingType: string[];
          gift: string[];
          watchCount?: string[];
        }[];
        returnsAccepted: string[];
        condition: {
          conditionId: string[];
          conditionDisplayName: string[];
        }[];
        isMultiVariationListing: string[];
        topRatedListing: string[];
      }[];
    }[];
    paginationOutput: {
      pageNumber: string[];
      entriesPerPage: string[];
      totalPages: string[];
      totalEntries: string[];
    }[];
    itemSearchURL: string[];
  }[];
}
