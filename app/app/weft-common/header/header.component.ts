import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authentication-services/auth.service';

@Component({
  selector: 'weft-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user: any;
  authService: AuthService;

  constructor(private router: Router,
    authService: AuthService) {
      this.authService = authService;
  }

  ngOnInit() {
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    if (userLoggedIn) {
      this.user = JSON.parse(userLoggedIn);
    }
  }

  logout(){
    localStorage.clear();
    this.authService.logout();
    return this.router.navigate(["/login"], { replaceUrl: true });
  }
}
