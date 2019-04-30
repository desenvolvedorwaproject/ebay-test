import { ISearchDefinition } from 'interfaces/searchDefinition';
import * as Rx from 'rxjs';

import apiService, { ApiService } from './api';

export class SearchDefinitionService {
  constructor(private apiService: ApiService) { }

  public list(): Rx.Observable<ISearchDefinition[]> {
    return this.apiService.get('/search-definition');
  }

  public save(model: Partial<ISearchDefinition>): Rx.Observable<ISearchDefinition> {
    if (model._id) {
      return this.apiService.put(`/search-definition/${model._id}`, model);
    }

    return this.apiService.post('/search-definition', model);
  }

  public delete(id: string): Rx.Observable<void> {
    return this.apiService.delete(`/search-definition/${id}`);
  }
}

const searchDefinitionService = new SearchDefinitionService(apiService);
export default searchDefinitionService;