import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeftCommonModule } from 'src/app/weft-common/weft-common.module';
import { ReportComponent } from './report/report.component';


@NgModule({
  declarations: [DashboardComponent, ReportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
