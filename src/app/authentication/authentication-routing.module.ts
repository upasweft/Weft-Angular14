import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AuthenticationComponent } from './authentication.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { InvoicePdfComponent } from './invoice-pdf/invoice-pdf.component';
import { ViewphotoComponent } from './customer/viewphoto/viewphoto.component';

const routes: Routes = [ 
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
      path: 'login',
      component: LoginComponent
      }
    ]
  },
  {
   path: 'auth-callback',
   component: AuthCallbackComponent
  },
  {
    path: 'invoice-pdf/:invoiceId',
    component: InvoicePdfComponent
   },
   {
    path: 'customer',
    component: CustomerComponent
   },
   {
    path: 'viewphoto',
    component: ViewphotoComponent
   },
  {
    path: 'unauthorized',
    component: AccessDeniedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
