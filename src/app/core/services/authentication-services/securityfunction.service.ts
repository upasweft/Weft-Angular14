import { Injectable } from '@angular/core';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Injectable({
  providedIn: 'root'
})
export class SecurityfunctionService {
  private securityFunctions: any[] = [];
  constructor(private httpService: WeftHttpService,) {

  }

  public getSecurityFunctions() {
    this.httpService.get(WeftAPIConfig.securityFunctionService).subscribe(sucurityFunctions => {
      this.securityFunctions = sucurityFunctions;
    });
  }

  public getAllowedRoles(functionKey: string): number {
    var allowedRoles = 0;
    var securityFunction = this.securityFunctions.filter(securityFunction => securityFunction['functionKey'] === functionKey)
    if (securityFunction.length === 1) {
      allowedRoles = Number(securityFunction[0]['allowedRoles']);
    }
    return allowedRoles;
  }
}
