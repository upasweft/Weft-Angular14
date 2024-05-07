import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  counter = 0;
  public isLoaderActive = false;

  constructor() { }

  public start() {
    this.counter++;
    this.isLoaderActive = true;
  }

  public stop(status?: boolean): void {
    this.counter--;
    if (this.counter <= 0) {
      this.isLoaderActive = false;
    }
  }


}
