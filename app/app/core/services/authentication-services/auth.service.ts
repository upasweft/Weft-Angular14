// auth.service.ts
import { Injectable } from "@angular/core";
import { UserInfoService } from "./user-info.service";
import { SecurityfunctionService } from "./securityfunction.service";
import * as moment from "moment";

import { Router } from "@angular/router";
import {
  OAuthService,
  OAuthStorage,
  UserInfo,
  TokenResponse,
} from "angular-oauth2-oidc";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private user: UserInfo | null = null;
  private userLogged: any;
  now = moment();

  constructor(
    private router: Router,
    private oauthService: OAuthService,
    private oauthStorage: OAuthStorage,
    private userinfo: UserInfoService,
    private securityfunctionService: SecurityfunctionService
  ) { }

  startAuthentication() {
    return this.router.navigate(["/login"], { replaceUrl: true });
  }

  completeAuthentication(tokenResponse: TokenResponse): Promise<void> {
    return this.oauthService.loadUserProfile().then((user) => {
     // this.user = user;
      this.oauthStorage.setItem(
        "expiresIn",
        tokenResponse.expires_in.toString()
      );
      this.oauthStorage.setItem("userLogged", JSON.stringify(this.user));
      this.oauthStorage.setItem(
        "claims",
        JSON.stringify(this.oauthService.getIdentityClaims())
      );
      localStorage.setItem("userLoggedIn", JSON.stringify(this.user));
    });
  }

  isLoggedIn(): boolean {
    if (this.oauthService.hasValidAccessToken()) {
      return true;
    } else {
      this.router.navigate(["report/dashboard", { login: true }]);
      return false;
    }
  }

  getClaims(): any {
    return this.oauthService.getIdentityClaims();
  }

  getAuthorizationHeaderValue(): string {
    return this.oauthService.authorizationHeader();
  }

  logout() {
    this.oauthService.logOut(true);
  }

  isAuthorized(securityFunctionKey: string): boolean {
    var allowedRoles = this.securityfunctionService.getAllowedRoles(securityFunctionKey);
    var userRoleValue = Number(this.getClaims()["role_value"]);
    if (allowedRoles && userRoleValue > 0) {
      return true;
    } else {
      return false;
    }
  }

  renewToken(): Promise<TokenResponse> {
    return this.oauthService.refreshToken();
  }

  /**
   * Method to check sessionExpired
   */
  isSessionExpired() {
    const currentTime = moment.utc(this.now).unix();
    const expiresAt = sessionStorage.getItem("expires_at");
    if (expiresAt && Number(expiresAt) > currentTime) {
      return false;
    } else {
      return true;
    }
  }
}
