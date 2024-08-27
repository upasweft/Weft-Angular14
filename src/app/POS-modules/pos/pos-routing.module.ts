import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/core/services/authentication-services/auth-guard.service';
import { MasterPageComponent } from 'src/app/zine-modules/zine/master-page/master-page.component';
import { UsersmanagementComponent } from './users/usersmanagement/usersmanagement.component';
import { UsercreateComponent } from './users/usercreate/usercreate.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { AdminusermangementComponent } from './adminuser/adminusermangement/adminusermangement.component';
import { AminusercreateComponent } from './adminuser/aminusercreate/aminusercreate.component';
import { ViewImagesComponent } from './view-images/view-images.component';
import { BackgroundImageManagementComponent } from './backgroundImage/background-image-management/background-image-management.component';
import { BackgroundimageComponent } from './backgroundImage/backgroundimage/backgroundimage.component';
import { ImageEditComponent } from './ImageEdit/ImageEdit.component';
import { QrcodemanagementComponent } from './qrcode/qrcodemanagement/qrcodemanagement.component';
import { QrcodeComponent } from './qrcode/qrcode/qrcode.component';
import { GroupacessComponent } from './groupacess/groupacess/groupacess.component';
import { AboutusCreateComponent } from './aboutus-create/aboutus-create.component';
import { SitesettingsmangementComponent } from './sitesettings/sitesettingsmangement/sitesettingsmangement.component';
import { SitesettingsComponent } from './sitesettings/sitesettings/sitesettings.component';
import { QrCodeMergeComponent } from './qrCodeMege/qr-code-merge/qr-code-merge.component';
import { BannersettingsManagementComponent } from './bannersettings/bannersettings-management/bannersettings-management.component';
import { BannersettingsCreateComponent } from './bannersettings/bannersettings-create/bannersettings-create.component';
import { ContactusCreateComponent } from './contact-us/contactus-create/contactus-create.component';
import { PrivacypolicyCreateComponent } from './privacypolicy-create/privacypolicy-create.component';
import { TermsandconditionsCreateComponent } from './termsandconditions-create/termsandconditions-create.component';
import { SubcategorymanagementComponent } from './subcategory/subcategorymanagement/subcategorymanagement.component';
import { SubcategoryComponent } from './subcategory/subcategory/subcategory.component';
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
import { PrintinvoiceComponent } from './invoice/printinvoice/printinvoice.component';




const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: MasterPageComponent,
  children: [
    {
      path:"adminusers-management",
      component : AdminusermangementComponent,
    },
    {
      path:"adminusers-create",
      component : AminusercreateComponent,
    },
    {
      path:"adminusers-edit/:usersId",
      component : AminusercreateComponent,
    },
    {
      path:"users-management",
      component : UsersmanagementComponent,
    },
    {
      path:"users-create",
      component : UsercreateComponent,
    },
    {
      path:"change-password",
      component : ChangePasswordComponent,
    },
    {
      path:"users-edit/:usersId",
      component : UsercreateComponent,
    },
    {
      path:"viewImage",
      component : ViewImagesComponent
    },
    {
      path:"backgroundImage",
      component : BackgroundImageManagementComponent,
    },
    {
      path:"backgroundImage-create",
      component : BackgroundimageComponent,
    },
    {
      path:"backgroundImage-edit/:backgroundImageId",
      component : BackgroundimageComponent,
    },
    {
      path:"imageedit-create",
      component : ImageEditComponent,
    },
    {
      path:"qrCodeManagement",
      component:QrcodemanagementComponent
    },
    {
      path:"qrCode-create",
      component:QrcodeComponent
    },
    {
      path:"groupaccess-create",
      component : GroupacessComponent,
    },
    {
      path:"aboutus",
      component : AboutusCreateComponent,
    },
    {
      path:"sitesettings-management",
      component : SitesettingsmangementComponent,
    },
    {
      path:"sitesettings-create",
      component : SitesettingsComponent,
    },
    {
      path:"sitesettings-edit/:siteSettingId",
      component : SitesettingsComponent,
    },
    {
      path:"qrCodeMerge",
      component : QrCodeMergeComponent,
    },
    {
      path:"bannerSettings",
      component : BannersettingsManagementComponent,
    },
    {
      path:"bannerSettings-create",
      component : BannersettingsCreateComponent,
    },
    {
      path:"bannerSettings-edit/:bannerSettingsId",
      component : BannersettingsCreateComponent,
    },
    {
      path:"contactus",
      component : ContactusCreateComponent,
    },
    {
      path:"privacypolicy",
      component : PrivacypolicyCreateComponent,
    },
    {
      path:"termsandconditions",
      component : TermsandconditionsCreateComponent,
    },
    {
      path:"subcategory-management",
      component : SubcategorymanagementComponent,
    },
    {
      path:"subcategory-create",
      component : SubcategoryComponent,
    },
    {
      path:"subcategory-edit/:subcategoryId",
      component : SubcategoryComponent,
    },
    {
      path:"category-management",
      component : CategorymanagementComponent,
    },
    {
      path:"category-create",
      component : CategorycreateComponent,
    },
    {
      path:"category-edit/:categoryId",
      component : CategorycreateComponent,
    },
    {
      path:"userGuidance",
      component : UserguidanceManagementComponent,
    },
    {
      path:"userGuidance-create",
      component : UserguidanceCreateComponent,
    },
    {
      path:"userGuidance-edit/:userGuidanceId",
      component : UserguidanceCreateComponent,
    },
    {
      path:"Stock-adjustment",
      component : StockadjustmentmangementComponent,
    },
    {
      path:"Stock-adjustment-create",
      component : StockadjustmentComponent,
    },
    {
      path:"stock-adjustment-edit/:stockAdjustmentId",
      component : StockadjustmentComponent,
    },
     {
      path:"product-management",
      component : ProductManagementComponent,
    },
    {
      path:"product-create",
      component : ProductCreateComponent,
    },
    {
      path:"product-edit/:productId",
      component : ProductCreateComponent,
    },
    {
      path:"invoice-management",
      component : InvoiceManagementComponent,
    },
    {
      path:"invoice-create",
      component : InvoicecreateComponent,
    },
    {
      path:"printinvoice/:invoiceId",
      component : PrintinvoiceComponent
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
