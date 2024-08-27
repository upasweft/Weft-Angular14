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
import { QrcodeComponent } from './qrcode/qrcode/qrcode.component';
import { QrcodemanagementComponent } from './qrcode/qrcodemanagement/qrcodemanagement.component';
import { PrintqrCodeComponent } from './qrcode/printqr-code/printqr-code.component';
import { AnQrcodeModule } from 'an-qrcode';
import { GroupacessComponent } from './groupacess/groupacess/groupacess.component';
import { AboutusCreateComponent } from './aboutus-create/aboutus-create.component';
import { SitesettingsComponent } from './sitesettings/sitesettings/sitesettings.component';
import { SitesettingsmangementComponent } from './sitesettings/sitesettingsmangement/sitesettingsmangement.component';
import { QrCodeMergeComponent } from './qrCodeMege/qr-code-merge/qr-code-merge.component';
import { BannersettingsCreateComponent } from './bannersettings/bannersettings-create/bannersettings-create.component';
import { BannersettingsManagementComponent } from './bannersettings/bannersettings-management/bannersettings-management.component';
import { ContactusCreateComponent } from './contact-us/contactus-create/contactus-create.component';
import { PrivacypolicyCreateComponent } from './privacypolicy-create/privacypolicy-create.component';
import { TermsandconditionsCreateComponent } from './termsandconditions-create/termsandconditions-create.component';
import { SubcategoryComponent } from './subcategory/subcategory/subcategory.component';
import { SubcategorymanagementComponent } from './subcategory/subcategorymanagement/subcategorymanagement.component';
import { CategorycreateComponent } from './category/categorycreate/categorycreate.component';
import { CategorymanagementComponent } from './category/categorymanagement/categorymanagement.component';
import { UserguidanceCreateComponent } from './userguidance/userguidance-create/userguidance-create.component';
import { UserguidanceManagementComponent } from './userguidance/userguidance-management/userguidance-management.component';
import { StockadjustmentComponent } from './stockadjustment/stockadjustment/stockadjustment.component';
import { StockadjustmentmangementComponent } from './stockadjustment/stockadjustmentmangement/stockadjustmentmangement.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductManagementComponent } from './product/product-management/product-management.component';
import { InvoiceManagementComponent } from './invoice/invoice-management/invoice-management.component';
import { InvoicecreateComponent } from './invoice/invoicecreate/invoicecreate.component';
import { ViewinvoiceComponent } from './invoice/viewinvoice/viewinvoice.component';
import { InvoiceitemsComponent } from './invoice/invoiceitems/invoiceitems.component';
import { PrintinvoiceComponent } from './invoice/printinvoice/printinvoice.component';
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
    ImageEditComponent,
    QrcodeComponent,
    QrcodemanagementComponent,
    PrintqrCodeComponent,
    GroupacessComponent,
    AboutusCreateComponent,
    SitesettingsComponent,
    SitesettingsmangementComponent,
    QrCodeMergeComponent,
    BannersettingsCreateComponent,
    BannersettingsManagementComponent,
    ContactusCreateComponent,
    PrivacypolicyCreateComponent,
    TermsandconditionsCreateComponent,
    SubcategoryComponent,
    SubcategorymanagementComponent,
    CategorycreateComponent,
    CategorymanagementComponent,
    UserguidanceCreateComponent,
    UserguidanceManagementComponent,
    StockadjustmentComponent,
    StockadjustmentmangementComponent,
    ProductCreateComponent,
    ProductManagementComponent,
    InvoiceManagementComponent,
    InvoicecreateComponent,
    ViewinvoiceComponent, 
    InvoiceitemsComponent,
    PrintinvoiceComponent
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
    ImageEditorModule,
    AnQrcodeModule
    
  ]
})
export class PosModule { 
  constructor() {
   
   
  }
}
