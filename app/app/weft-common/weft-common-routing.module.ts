import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { BrokenLinkComponent } from './broken-link/broken-link.component';
import { UnauthorizedLinkComponent } from './unauthorized-link/unauthorized-link.component';

const routes: Routes = [
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'terms-of-service',
    component: TermsOfServiceComponent
  },
  {
    path: 'unauthorized-link',
    component: UnauthorizedLinkComponent
  },
  {
    path: 'invalid-link',
    component: BrokenLinkComponent
  },
  {
    path: 'broken-link',
    pathMatch: 'full',
    component: BrokenLinkComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WeftCommonRoutingModule { }
