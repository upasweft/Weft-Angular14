import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterPageComponent } from './master-page/master-page.component';
import { AuthGuardService } from 'src/app/core/services/authentication-services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: MasterPageComponent,
    children: [
      {
        path: 'report',
        loadChildren: () => import('../report/report.module').then(mod => mod.ReportModule),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZineRoutingModule { }
