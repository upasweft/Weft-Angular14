import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      // if (this.authService.isAuthorized(next.data.allowedRoles)) {
      //   return true;
      // } else {
      //   this.router.navigate(['unauthorized']);
      //   return true;
      // }
      return true;
    }
    this.authService.startAuthentication();
    return false;
  }
}
