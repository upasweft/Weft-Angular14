import { Component, OnInit } from "@angular/core";
import { OAuthService, OAuthStorage } from "angular-oauth2-oidc";
import { AuthService } from "src/app/core/services/authentication-services/auth.service";
import { authPasswordFlowConfig } from "src/app/authentication/auth-config/auth-password-flow.config";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginFailed: boolean = false;
  userProfile: object = {}; // Initialize userProfile property
  authService!: AuthService; // Initialize authService property
  loginForm!: FormGroup; // Initialize loginForm property
  submitted: boolean = false;
  user: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private oauthService: OAuthService,
    private oauthStorage: OAuthStorage,
    authService: AuthService,
    private httpService: WeftHttpService
  ) {
    this.oauthService.configure(authPasswordFlowConfig);
    //this.oauthService.loadDiscoveryDocument();
    this.authService = authService;
  }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    console.log("test");
    localStorage.clear();
    this.submitted = true;
    if (!this.loginForm.valid) {
      return;
    }

    this.oauthService
      .fetchTokenUsingPasswordFlow(this.loginForm.value.username, this.loginForm.value.password)
      .then((tokenResponse) => {
        this.loginFailed = false;
         this.authService.completeAuthentication(tokenResponse).then(res => {
        return this.router.navigate(["report/dashboard"], { replaceUrl: true });
         });
      })
      .catch((err) => {
        this.loginFailed = true;
      });
  }

  Exit() {
  }
}
