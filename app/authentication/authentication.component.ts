import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    const accountDetailsString = sessionStorage.getItem(`accountDetails`);
    const accountDetails = accountDetailsString ? JSON.parse(accountDetailsString) : null;

    if (accountDetails != null && accountDetails.isOrganizationOnboarded) {
      this.router.navigate(['unauthorized']);
    } else {
      this.router.navigate(['/report/dashboard']);
    }
  }
}
