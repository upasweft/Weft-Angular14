import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/core/services/authentication-services/auth-guard.service';
import { MasterPageComponent } from 'src/app/zine-modules/zine/master-page/master-page.component';
import { UserReportComponent } from './user-report/user-report/user-report.component';
import { UserReportManagmentComponent } from './user-report/user-report-managment/user-report-managment.component';
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
import { UsedqrcodesmangementComponent } from './usedqrcodes/usedqrcodesmangement/usedqrcodesmangement.component';
import { UsedqrcodesComponent } from './usedqrcodes/usedqrcodes/usedqrcodes.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: MasterPageComponent,
    children: [
    {
      path:"users-report",
      component:UserReportComponent
    },
    {
      path:"users-report-management/:usersReportData",
      component : UserReportManagmentComponent
    },
    {
      path:"vat-report",
      component:VatReportComponent
    },
    {
      path:"vat-report-management/:vatReportData",
      component : VatReportMangementComponent
    },
    {
      path:"product-report",
      component:ProductReportComponent
    },
    {
      path:"product-report-management/:productReportData",
      component : ProductReportManagementComponent
    },
    {
      path:"monthlysummary-report",
      component:MonthlysummaryComponent
    },
    {
      path:"monthlysummary-report-management/:monthlyReportData",
      component : MonthlysummaryManagementComponent
    },
    {
      path:"stock-report",
      component:StockComponent
    },
    {
      path:"stock-report-management/:stockReportData",
      component : StockmanagementComponent
    },
    {
      path:"stock-report-Details-management/:stockReportData",
      component : StockdetailsComponent
    },
    {
      path:"void-report",
      component:VoidReportComponent
    },
    {
      path:"void-report-management/:voidReportData",
      component : VoidreportMangementComponent
    },
    {
      path:"sales-report",
      component:SalesReportComponent
    },
    {
      path:"sales-report-management/:invoiceReportData",
      component : SalesReportManagementComponent
    },

    {
      path:"dailysales-report",
      component:DailysalesReportComponent
    },
    {
      path:"dailysales-report-management/:invoiceReportData",
      component : DailysalesmangementComponent
    },
    {
      path:"usedqrcode-report",
      component : UsedqrcodesComponent
    },
    {
      path:"usedqrcode-report-management/:invoiceReportData",
      component : UsedqrcodesmangementComponent
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
