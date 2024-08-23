import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosRoutingModule } from './pos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import { PosCommonModule } from '../pos-common/pos-common.module';
import { UsersmanagementComponent } from './users/usersmanagement/usersmanagement.component';
import { UsercreateComponent } from './users/usercreate/usercreate.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { AdminusermangementComponent } from './adminuser/adminusermangement/adminusermangement.component';
import { AminusercreateComponent } from './adminuser/aminusercreate/aminusercreate.component';
import { DeleteuserComponent } from './adminuser/deleteuser/deleteuser.component';
import { ChangeuserpasswordComponent } from './adminuser/changeuserpassword/changeuserpassword.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ViewImagesComponent } from './view-images/view-images.component';
import { BackgroundImageManagementComponent } from './backgroundImage/background-image-management/background-image-management.component';
import { BackgroundimageComponent } from './backgroundImage/backgroundimage/backgroundimage.component';
import { ImageEditorModule } from '@syncfusion/ej2-angular-image-editor';
import { registerLicense } from '@syncfusion/ej2-base';
import { ImageEditComponent } from './ImageEdit/ImageEdit.component';
registerLicense("Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCd0x0RHxbf1x0ZFJMZV5bRXRPMyBoS35RckVrW31eeHVTQ2JeWER1");

@NgModule({
  declarations: [
    AdminusermangementComponent, 
    AminusercreateComponent, 
    DeleteuserComponent, 
    UsersmanagementComponent, 
    UsercreateComponent, 
    ChangePasswordComponent,
    ChangeuserpasswordComponent,
    ForgotPasswordComponent,
    ViewImagesComponent,
    BackgroundimageComponent,
    BackgroundImageManagementComponent,
    ImageEditComponent
   ],
  imports: [
    CommonModule,
    PosRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    FormsModule,
    PosCommonModule,
    NgSelectModule,
    ReactiveFormsModule,
    ImageEditorModule
    
  ]
})
export class PosModule { 
  constructor() {
   
   
  }
}
