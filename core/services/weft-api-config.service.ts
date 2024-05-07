import { Injectable } from '@angular/core';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Injectable({
  providedIn: 'root'
})
export class WeftApiConfigService {

  constructor() { }

  getAPIRoute(theString, argumentArray) {
    theString = WeftAPIConfig[theString];
    const t =  [argumentArray].reduce((p, c) => p.replace(/%s/, c), theString);
    return t;
}
}
