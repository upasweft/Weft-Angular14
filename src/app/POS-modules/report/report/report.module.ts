import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { UserReportComponent } from './user-report/user-report/user-report.component';
import { UserReportManagmentComponent } from './user-report/user-report-managment/user-report-managment.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { PosCommonModule } from '../../pos-common/pos-common.module';
import { ProductReportComponent } from './product-report/product-report/product-report.component';
import { ProductReportManagementComponent } from './product-report/product-report-management/product-report-management.component';
import { SalesReportComponent } from './sales-report/sales-report/sales-report.component';
import { SalesReportManagementComponent } from './sales-report/sales-report-management/sales-report-management.component';
import { VatReportComponent } from './vat-report/vat-report/vat-report.component';
import { VatReportMangementComponent } from './vat-report/vat-report-mangement/vat-report-mangement.component';
import { DailysalesReportComponent } from './dailysales/dailysales-report/dailysales-report.component';
import { DailysalesmangementComponent } from './dailysales/dailysalesmangement/dailysalesmangement.component';
import { StockComponent } from './Stock/stock/stock.component';
import { StockmanagementComponent } from './Stock/stockmanagement/stockmanagement.component';
import { VoidReportComponent } from './voidreport/void-report/void-report.component';
import { VoidreportMangementComponent } from './voidreport/voidreport-mangement/voidreport-mangement.component';
import { MonthlysummaryComponent } from './monthlysummary/monthlysummary/monthlysummary.component';
import { MonthlysummaryManagementComponent } from './monthlysummary/monthlysummary-management/monthlysummary-management.component';
import { StockdetailsComponent } from './Stock/stock/stockdetails/stockdetails.component';
import { UsedqrcodesComponent } from './usedqrcodes/usedqrcodes/usedqrcodes.component';
import { UsedqrcodesmangementComponent } from './usedqrcodes/usedqrcodesmangement/usedqrcodesmangement.component';
import { UsedqrviewComponent } from './usedqrcodes/usedqrview/usedqrview.component';


@NgModule({
  declarations: [UserReportComponent, UserReportManagmentComponent, ProductReportComponent, ProductReportManagementComponent, SalesReportComponent, SalesReportManagementComponent, VatReportComponent, VatReportMangementComponent, DailysalesReportComponent, DailysalesmangementComponent, StockComponent, StockmanagementComponent, VoidReportComponent, VoidreportMangementComponent, MonthlysummaryComponent, MonthlysummaryManagementComponent, StockdetailsComponent, UsedqrcodesComponent, UsedqrcodesmangementComponent, UsedqrviewComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    PosCommonModule,
    DxDataGridModule,
    DxButtonModule,
  ]
})
export class ReportModule { }
