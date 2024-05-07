// authentication.interceptor.ts
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpHandler,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { OAuthService, UserInfo, TokenResponse } from "angular-oauth2-oidc";
import * as moment from "moment";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  now = moment();

  constructor(
    private oauthService: OAuthService,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const storageUser = sessionStorage.getItem("access_token");
    if (storageUser) {
      request = request.clone({
        headers: request.headers.set(
          "Authorization",
          this.authService.getAuthorizationHeaderValue()
        ),
      });
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.authService.renewToken().then((tokenResponse) => {
            if (tokenResponse) {
              this.authService.completeAuthentication(tokenResponse);
            } else {
              this.router.navigate(["login"]);
            }
          });
          return throwError(error);
        }
        else if ((error.status === 500 || error.status === 400) && error.error){
          this.toastrService.error(error.error.Value.Message);
        }
        return throwError(error);
      })
    );
  }
}
