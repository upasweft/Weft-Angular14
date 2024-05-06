import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, EMPTY, throwError, of } from 'rxjs';
import { map, catchError, retry, shareReplay, delay, mergeMap, retryWhen } from 'rxjs/operators';

const getErrorMessage = (maxRetry: number) => `Tried to load resource over XHR for ${maxRetry}times without success.Giving up.`;
const DEFAULT_MAX_RETRIES = 5;

@Injectable({
  providedIn: 'root'
})
export class WeftHttpService {
  public url: any;
  public body: any;
  apiUrl = environment.apiUrl;
  commonHeaders = new HttpHeaders({
    Authorization: 'Bearer YxeUWAcRsTM2VL7quDOX16yhWRwOjl7fwx1JUX5P0LSybccYYHaOXplfkEG82Pc',
    YAppKey: 'c46dc602-84a9',
  });

  constructor(private http: HttpClient) { }

  public delayedRetry(delayMs: number, maxRetry = DEFAULT_MAX_RETRIES) {
    let retries = maxRetry;
    return (src: Observable<any>) => src.pipe(retryWhen((errors: Observable<any>) => errors.pipe(delay(delayMs),
      mergeMap(error => retries-- > 0 ? of(error) : throwError(getErrorMessage(maxRetry))))));
  }
  get(route: string, params?: any, hideLoader?: boolean): Observable<any> {
    this.url = this.apiUrl + route;
    const options = {
      headers: this.commonHeaders,
      params
    };

    return this.http.get(this.url, options)
      .pipe(map(response => {
        return response;
      }))
      .pipe(
      this.delayedRetry(1000, 3),
      catchError(error => {
        console.error(error);
        return EMPTY;
      }),
      shareReplay());
  }

  post(route: string, data: any, params?: any, hideLoader?: boolean): Observable<any> {
    this.url = this.apiUrl + route;
    const options = {
      headers: this.commonHeaders,
      params
    };
    this.body = data;
    return this.http.post(this.url, this.body, options)
      .pipe(map(response => {
        return response;
      }))
      .pipe(
      this.delayedRetry(1000, 3),
      catchError(error => {
        console.error(error);
        return EMPTY;
      }),
      shareReplay());
  }

  put(route: string, data: any, params?: any, hideLoader?: boolean): Observable<any> {
    this.url = this.apiUrl + route;
    const options = {
      headers: this.commonHeaders,
      params
    };
    this.body = data;
    return this.http.put(this.url, this.body, options)
      .pipe(map(response => {
        return response;
      }))
      .pipe(
      this.delayedRetry(1000, 3),
      catchError(error => {
        console.error(error);
        return EMPTY;
      }),
      shareReplay());
  }

  delete(route: string, params?: any, hideLoader?: boolean): Observable<any> {
    this.url = this.apiUrl + route;
    const options = {
      headers: this.commonHeaders,
      params
    };
    return this.http.delete(this.url, options)
      .pipe(map(response => {
        return response;
      }))
      .pipe(
      this.delayedRetry(1000, 3),
      catchError(error => {
        console.error(error);
        return EMPTY;
      }),
      shareReplay());
  }
}
