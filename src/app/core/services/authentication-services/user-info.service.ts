import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})

export class UserInfoService {
  decodedtoken: any;
  private token!: string | null;
  constructor() { }
  getUserInfo() {
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      const decodedToken = helper.decodeToken(this.token);
      return decodedToken;
    } else {
      return {};
    }

  }
}
