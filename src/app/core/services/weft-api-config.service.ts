import { Injectable } from '@angular/core';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

// Define a type for the keys of WeftAPIConfig
type WeftAPIConfigKey = keyof typeof WeftAPIConfig;

@Injectable({
  providedIn: 'root'
})
export class WeftApiConfigService {

  constructor() { }

  getAPIRoute(key: WeftAPIConfigKey, argumentArray: any[]): string {
    // Ensure the key is valid
    const routeTemplate = WeftAPIConfig[key];
    // Replace placeholders in the route string with arguments
    const result = argumentArray.reduce((template, arg) => template.replace(/%s/, arg), routeTemplate);
    return result;
  }
}
