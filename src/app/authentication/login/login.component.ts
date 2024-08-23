import { Component, OnInit } from "@angular/core";
import { OAuthService, OAuthStorage } from "angular-oauth2-oidc";
import { AuthService } from "src/app/core/services/authentication-services/auth.service";
import { authPasswordFlowConfig } from "src/app/authentication/auth-config/auth-password-flow.config";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';
import { BsModalService } from "ngx-bootstrap/modal";
import { ForgotPasswordComponent } from "src/app/POS-modules/pos/forgot-password/forgot-password.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginFailed: boolean = false;
  userProfile!: object;
  authService: AuthService;
  loginForm!: FormGroup;
  submitted: boolean = false;
  user: any;
  bsModalRef: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private oauthService: OAuthService,
    private oauthStorage: OAuthStorage,
    authService: AuthService,private modalService: BsModalService,
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
    localStorage.clear();
    this.submitted = true;
    if (!this.loginForm.valid) {
      return;
    }
    // if (this.loginForm.value.username=="admin")
    // {
    //   localStorage.setItem("isadmin","true");
    // }

    // // Temporary
    // this.oauthStorage.setItem("IsLoggedIn", "1");
    // return this.router.navigate(["report/dashboard"], { replaceUrl: true });
    

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

  // signUp(){
  //   this.bsModalRef.hide();
  //   const initialState = {
  //     title: 'Examination Guidelines'
  //   };
  //   this.bsModalRef = this.modalService.show(SignupComponent, { backdrop: 'static',  keyboard: false });
  // }

  // forgetPassword(){ 
  //   this.bsModalRef.hide();
  //   this.bsModalRef = this.modalService.show(ForgetPasswordComponent, { backdrop: 'static',  keyboard: false });
  // }
  forgotPassword()
  {
    this.bsModalRef = this.modalService.show(ForgotPasswordComponent, {
      initialState: {
      }, class: 'modal-dialog-centered modal-lg view-invoice-modal'
    });
  }
}
