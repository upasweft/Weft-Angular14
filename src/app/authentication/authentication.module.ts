import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { WeftCommonModule } from '../weft-common/weft-common.module';
import { BASE_URL } from '../authentication/auth-config/app.tokens';
import { CustomerComponent } from './customer/customer/customer.component';
import { ViewphotoComponent } from './customer/viewphoto/viewphoto.component';


@NgModule({
  declarations: [AuthenticationComponent, AuthCallbackComponent, LoginComponent,CustomerComponent,ViewphotoComponent,
                 AccessDeniedComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    WeftCommonModule
  ],
  exports:[],
  providers: [
    { provide: BASE_URL, useValue: 'http://www.angular.at' }
  ],
})
export class AuthenticationModule { }
