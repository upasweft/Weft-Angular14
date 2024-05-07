import { Injectable } from '@angular/core';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Injectable({
  providedIn: 'root'
})
export class SecurityfunctionService {
  private securityFunctions: any[] = [];

  constructor(private httpService: WeftHttpService) {
    this.getSecurityFunctions();
  }

  public getSecurityFunctions() {
    this.httpService.get(WeftAPIConfig.securityFunctionService).subscribe(securityFunctions => {
      this.securityFunctions = securityFunctions;
    });
  }

  public getAllowedRoles(functionKey: string): number {
    var allowedRoles = 0;
    var securityFunction = this.securityFunctions.find(securityFunction => securityFunction['functionKey'] === functionKey);
    if (securityFunction) {
      allowedRoles = Number(securityFunction['allowedRoles']);
    }
    return allowedRoles;
  }
}
