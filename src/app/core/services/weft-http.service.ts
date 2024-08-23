import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, EMPTY, throwError, of } from 'rxjs';
import { map, catchError, retryWhen, delay, mergeMap, shareReplay } from 'rxjs/operators';

const getErrorMessage = (maxRetry: number) => `Tried to load resource over XHR for ${maxRetry} times without success. Giving up.`;
const DEFAULT_MAX_RETRIES = 5;

@Injectable({
  providedIn: 'root'
})
export class WeftHttpService {
  private apiUrl = environment.apiUrl;
  private commonHeaders = new HttpHeaders({
    Authorization: 'Bearer YxeUWAcRsTM2VL7quDOX16yhWRwOjl7fwx1JUX5P0LSybccYYHaOXplfkEG82Pc',
    YAppKey: 'c46dc602-84a9',
  });

  constructor(private http: HttpClient) { }

  private delayedRetry(delayMs: number, maxRetry = DEFAULT_MAX_RETRIES) {
    return (src: Observable<any>) => src.pipe(
      retryWhen(errors =>
        errors.pipe(
          delay(delayMs),
          mergeMap((error, index) =>
            index < maxRetry ? of(error) : throwError(getErrorMessage(maxRetry))
          )
        )
      )
    );
  }

  private buildUrl(route: string): string {
    return `${this.apiUrl}${route}`;
  }

  get(route: string, params?: any): Observable<any> {
    const url = this.buildUrl(route);
    const options = { headers: this.commonHeaders, params };

    return this.http.get(url, options).pipe(
      map(response => response),
      this.delayedRetry(1000, 3),
      catchError(error => {
        console.error(error);
        return EMPTY;
      }),
      shareReplay()
    );
  }

  post(route: string, data: any, params?: any): Observable<any> {
    const url = this.buildUrl(route);
    const options = { headers: this.commonHeaders, params };

    return this.http.post(url, data, options).pipe(
      map(response => response),
      this.delayedRetry(1000, 3),
      catchError(error => {
        console.error(error);
        return EMPTY;
      }),
      shareReplay()
    );
  }

  put(route: string, data: any, params?: any): Observable<any> {
    const url = this.buildUrl(route);
    const options = { headers: this.commonHeaders, params };

    return this.http.put(url, data, options).pipe(
      map(response => response),
      this.delayedRetry(1000, 3),
      catchError(error => {
        console.error(error);
        return EMPTY;
      }),
      shareReplay()
    );
  }

  delete(route: string, params?: any): Observable<any> {
    const url = this.buildUrl(route);
    const options = { headers: this.commonHeaders, params };

    return this.http.delete(url, options).pipe(
      map(response => response),
      this.delayedRetry(1000, 3),
      catchError(error => {
        console.error(error);
        return EMPTY;
      }),
      shareReplay()
    );
  }
}
