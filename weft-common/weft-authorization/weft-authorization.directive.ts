import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/core/services/authentication-services/user-info.service';

@Directive({
  selector: '[appWeftAuthorization]'
})
export class WeftAuthorizationDirective {
  private _roles: number[] = []; // Initialize _roles property
  userInfo: any;
  roleId: any;
  hasView = false;

  @Input()
  set appWeftAuthorization(roles: number[]) { // Add type annotation for roles input
    this._roles = roles;
    this.updateView();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private user: UserInfoService,
    private el: ElementRef) { }

  updateView() {
    this.userInfo = this.user.getUserInfo();
    this.roleId = Number(this.userInfo.role[1]);
    if (!this.hasView && this._roles && this._roles.length > 0 && this._roles.includes(this.roleId)) {
      this.vcr.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else {
      this.vcr.clear();
      this.hasView = false;
    }
  }

}
