import axios, { AxiosError } from 'axios';
import ApiError from 'errors/api';
import { apiRequestFormatter } from 'formatters/apiRequest';
import * as Rx from 'rxjs';
import * as RxOp from 'rxjs/operators';

import { API_ENDPOINT } from '../settings';
import { apiResponseFormatter } from './../formatters/apiResponse';

export class ApiService {
  constructor(
    private apiEndpoint: string
  ) { }

  public get<T = any>(url: string, params?: any): Rx.Observable<T> {
    return this.request<T>('GET', url, params).pipe(
      RxOp.map(({ response }) => response),
      RxOp.filter(response => response !== undefined)
    );
  }

  public post<T = any>(url: string, body: any): Rx.Observable<T> {
    return this.request<T>('POST', url, body).pipe(
      RxOp.map(({ response }) => response),
      RxOp.filter(response => response !== undefined)
    );
  }

  public put<T = any>(url: string, body: any): Rx.Observable<T> {
    return this.request<T>('PUT', url, body).pipe(
      RxOp.map(({ response }) => response),
      RxOp.filter(response => response !== undefined)
    );
  }

  public delete<T = any>(url: string, params?: any): Rx.Observable<T> {
    return this.request<T>('DELETE', url, params).pipe(
      RxOp.map(({ response }) => response),
      RxOp.filter(response => response !== undefined)
    );
  }

  public upload<T = any>(url: string, data: FormData) {
    return this.request<T>('POST', url, data);
  }

  private request<T = any>(
    method: string,
    url: string,
    data: any = null,
    retry: boolean = true
  ): Rx.Observable<{ response: T, progress: number }> {
    const progress$ = new Rx.BehaviorSubject(0);

    return Rx.of(true).pipe(
      RxOp.switchMap(() => {
        return axios.request({
          baseURL: this.apiEndpoint,
          url,
          method,
          headers: {
            'Content-Type': data instanceof FormData ?
              'multipart/form-data' :
              'application/json'
          },
          params: method === 'GET' ? apiRequestFormatter(data) : null,
          data: method === 'POST' || method === 'PUT' ? apiRequestFormatter(data) : null,
          onUploadProgress: (progress: ProgressEvent) => {
            const result = progress.loaded / progress.total;
            progress$.next(result * 100);
          }
        });
      }),
      RxOp.tap(() => progress$.next(100)),
      RxOp.map(res => apiResponseFormatter<T>(res.data) || null),
      RxOp.startWith(undefined),
      RxOp.combineLatest(
        progress$.pipe(RxOp.distinctUntilChanged()),
        (response, progress) => ({ response, progress })
      ),
      RxOp.catchError(err => {
        progress$.complete();
        return this.handleError(err, retry);
      }),
    );
  }

  private handleError(err: AxiosError, retry: boolean) {
    if (!err.config || !err.response) return Rx.throwError(err);
    return Rx.throwError(new ApiError(err.config, err.response, err));
  }

}

const apiService = new ApiService(API_ENDPOINT);
export default apiService;