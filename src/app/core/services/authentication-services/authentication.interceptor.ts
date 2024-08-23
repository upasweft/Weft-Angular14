import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpHandler,
} from "@angular/common/http";
import { Observable, throwError, from } from "rxjs";
import { AuthService } from "./auth.service";
import { catchError, switchMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { OAuthService, UserInfo } from "angular-oauth2-oidc";
import * as moment from "moment";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private user: UserInfo | null = null;
  now = moment();

  constructor(
    private oauthService: OAuthService,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

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
          return from(this.authService.renewToken()).pipe(
            switchMap((tokenResponse) => {
              if (tokenResponse) {
                this.authService.completeAuthentication(tokenResponse);
                const newRequest = request.clone({
                  headers: request.headers.set(
                    "Authorization",
                    this.authService.getAuthorizationHeaderValue()
                  ),
                });
                return next.handle(newRequest);
              } else {
                this.router.navigate(["login"]);
                return throwError(error);
              }
            })
          );
        } else if ((error.status === 500 || error.status === 400) && error.error) {
          let message = error.error.Value ? error.error.Value.Message : error.error.Message;
          this.toastrService.error(message);
          return throwError(error);
        } else {
          return throwError(error);
        }
      })
    );
  }
}
