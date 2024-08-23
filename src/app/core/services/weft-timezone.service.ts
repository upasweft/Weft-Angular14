import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeftTimezoneService {

  constructor() { }

  getTimeZone(timeZone: string) {
    if (timeZone.includes('Hawai')) {
      return 'HST';
    } else if (timeZone.includes('Alaska')) {
      return 'AKST';
    }
    return timeZone.match(/\b(\w)/g).join('');
  }
}
