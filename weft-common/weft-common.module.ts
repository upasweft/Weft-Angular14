import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { BrokenLinkComponent } from './broken-link/broken-link.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { WeftValidator } from './weft-validator/weft-validator.directive';

import { UnauthorizedLinkComponent } from './unauthorized-link/unauthorized-link.component';
import { GlobalSearchResultComponent } from './global-search-result/global-search-result.component';
import { WeftAuthorizationDirective } from './weft-authorization/weft-authorization.directive';
import { WeftCommonRoutingModule } from './weft-common-routing.module';
import { ConfirmPopupComponent } from './confirm-popup/confirm-popup.component';
import { FooterComponent } from './footer/footer.component';
import { SettingsComponent } from './settings/settings.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ 
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    SettingsComponent,
    SideNavComponent,
    ConfirmPopupComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    BrokenLinkComponent,
    WeftValidator,
    UnauthorizedLinkComponent,
    GlobalSearchResultComponent,
    WeftAuthorizationDirective
  ],
  imports: [
    RouterModule,
    CommonModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,FormsModule,
    TooltipModule.forRoot(),
    WeftCommonRoutingModule
  ],
  exports: [
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    SettingsComponent,
    SideNavComponent,
    ConfirmPopupComponent,
    BrokenLinkComponent,
    WeftAuthorizationDirective
  ],
  entryComponents: [ConfirmPopupComponent],
})
export class WeftCommonModule { }
