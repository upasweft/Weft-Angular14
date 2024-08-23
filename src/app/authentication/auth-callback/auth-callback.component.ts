import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationGroup } from 'src/app/core/services/app-animations';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss'],
  animations: AnimationGroup,
})
export class AuthCallbackComponent implements OnInit {

  constructor(private router: Router) {
      this.router.navigate(['order/dashboard']);
  }

  ngOnInit() {

  }

}