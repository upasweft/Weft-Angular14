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
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
