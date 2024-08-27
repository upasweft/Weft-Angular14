import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';
import dxDataGrid from 'devextreme/ui/data_grid';

@Component({
  selector: 'app-stockdetails',
  templateUrl: './stockdetails.component.html',
  styleUrls: ['./stockdetails.component.scss']
})
export class StockdetailsComponent implements OnInit {
  public title: string = 'Stock Details Report';
  public getGridDataApi: string = WeftAPIConfig.stockAdjustment+'/stockreportDetails';
  public gridKey: string = 'GRD';
  public keyField: string = "productId";
  public isReport :boolean = false;
  public columnDefs: any[] = [];
  public resourceKey: string = 'stockReportData';
  resourceKeyValue: any;
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;
  today = new Date();
  headerDate!: string;
  gridManagementForm: any;
  dataSource: any;
  closingStock!: number;
  
  constructor(public route: ActivatedRoute,
    private httpService: WeftHttpService,
    private toastrService: ToastrService,
    private fb: FormBuilder,) {
  //   this.columnDefs = [
  //  //  {dataField : 'slNo',caption : 'Sl.No', alignment: 'left'},
  //  {dataField : 'item',caption : 'Item'},
  //  {dataField : 'siteName',caption : 'Site Name'},
  //  { dataField : 'docDate', caption : 'Doc Date',dataType: "date", format: "dd/MM/yyyy",},
  //  {dataField : 'docNo',caption : 'Doc No'},
  //   { dataField : 'inQty', caption : 'Received Qty'},
  //   { dataField : 'outQty', caption : 'Issued Qty '},
  //   { dataField : 'remarks', caption : 'Stock Type',},
  // // { dataField : 'closingDebit', caption : ''},
  // ];
  }
  customizeCaptionAmount(data: { value: number; }){
    return ''+data.value.toFixed(2);
  }
  
  ngOnInit() {
    if (this.route.snapshot.paramMap.get(this.resourceKey)) {
      this.route.paramMap.subscribe(params => {
        const paramValue = params.get(this.resourceKey);
        if (paramValue) {
          this.resourceKeyValue = JSON.parse(paramValue);
        }
      });
    }
    this.createForm();
    //this.bindToDataSource();
    this.headerDate = this.title + " - DATE FROM " +
    this.resourceKeyValue.dateFrom +
    " TO " +
    this.resourceKeyValue.dateTo;
    this.bindToDataSource();
  }
                            
  createForm() {
    this.gridManagementForm = this.fb.group({ search: new FormControl('') });
  }

  bindToDataSource() {
    this.httpService.post(this.getGridDataApi, this.resourceKeyValue).subscribe(result => {
      if (result) {
        this.dataSource = result.map((item: any, index: number) => ({ ...item, slNo: index + 1 })); 
        const sumInQty = this.dataSource.reduce((total: any, item: { inQty: any; }) => total + item.inQty, 0);
        const sumOutQty = this.dataSource.reduce((total: any, item: { outQty: any; }) => total + item.outQty, 0);
        const closingStock = sumInQty - sumOutQty;
        this.closingStock = closingStock;
        this.dataSource.push({ closingStock: this.closingStock });
      }
    })
}

  customizeColumns(columns: { alignment: string; }[]) {
   columns[3].alignment = "left";
  }

  generatePDF(event: any) {
    this.transferData(this.dataGrid.instance);
  }
  
  transferData(event: any) {
    const doc = new jsPDF('l', 'px', 'a4');
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: event,
      // Configuration options may differ based on the library version
    }).then(() => {
      const pages = doc.getNumberOfPages();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      let horizontalPos = pageWidth / 2;
      let verticalPos = pageHeight - 10;
      doc.setFontSize(10);
      for (let j = 1; j <= pages; j++) {
        doc.setPage(j);
        doc.setDrawColor(0, 0, 0);
        doc.line(5, 43, 623, 43);
        doc.line(10, 73, 620, 73);
        if (j == pages) {
          doc.line(10, verticalPos - 15, 620, verticalPos - 15); // Footer line - up
          doc.line(10, verticalPos, 620, verticalPos); // Footer line - down
        }
        doc.setFontSize(10);
        doc.text(this.title.toUpperCase(), horizontalPos, 32, { align: "center" });
        doc.text("Printed on: " + moment(this.today).format("MM/DD/YYYY"), 10, verticalPos);
        doc.text(`Page ${j} of ${pages}`, horizontalPos, verticalPos, { align: 'center' });
      }
      doc.output('dataurlnewwindow');
      doc.save(this.title + '.pdf');
    });
  }
 
  customizeCaptionClosingBalance(data: { value: number }) {
    // Check if data.value is a number and use it directly
    if (data.value < 0) {
      return 'Closing Stock ' + data.value.toFixed(2);
    } else {
      return 'Closing Stock ' + data.value.toFixed(2);
    }
  }
  

  calculateCustomSummary(options: { value: undefined; totalValue: any; }) {
    if (options.value != undefined){
      options.totalValue =  options.value;
      console.log(options.totalValue)
    }
}

  calculateSelectedRow(options: { value: undefined; totalValue: any; })
  {
    console.log("c",options.value)
    if (options.value != undefined){
      options.totalValue =  options.value;
    }
  }
}
