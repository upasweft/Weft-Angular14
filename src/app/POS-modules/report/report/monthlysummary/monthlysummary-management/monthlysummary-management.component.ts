import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
@Component({
  selector: 'app-monthlysummary-management',
  templateUrl: './monthlysummary-management.component.html',
  styleUrls: ['./monthlysummary-management.component.scss']
})
export class MonthlysummaryManagementComponent implements OnInit {
  public gridManagementForm!: FormGroup;
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;
  public title: string = 'Monthly Summary Report';
  public getGridDataApi: string = WeftAPIConfig.invoiceService+'/monthlysummary';
  public gridKey: string = 'GRD';
  public keyField: string = "invoiceId";
  public isReport :boolean = false;
  public columnDefs: any[];
  headerDate: any;
  public resourceKey: string = 'monthlyReportData';
  resourceKeyValue: any;
  today = new Date();
  dataSource:any;
  constructor(public route: ActivatedRoute,
    private httpService: WeftHttpService,
    private toastrService: ToastrService,
    private fb: FormBuilder,) {
    this.columnDefs = [
      {dataField : 'billCount',caption : 'Monthly Bills',alignment: 'left'},
      {dataField : 'tax',caption : 'Tax',format: { type: 'fixedPoint', precision: 2 }},
      {dataField : 'disc',caption : 'Disc',format: { type: 'fixedPoint', precision: 2 }},
      {dataField : 'amount',caption : 'Amount',format: { type: 'fixedPoint', precision: 2 }},

      
     ];

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
    console.log(this.resourceKeyValue)
    this.createForm();
    this.bindToDataSource();
    // this.headerDate = this.title + " - DATE FROM " +
    // this.resourceKeyValue.dateFrom +
    // " TO " +
    // this.resourceKeyValue.dateTo;
  }

  createForm() {
    this.gridManagementForm = this.fb.group({ search: new FormControl('') });
  }

  bindToDataSource() {
    this.httpService.post(this.getGridDataApi, this.resourceKeyValue).subscribe(result => {
      if (result) {
        this.dataSource = result; 
        console.log(this.dataSource)
      }
    })
}

  generatePDF(event: any) {
    this.transferData(this.dataGrid.instance);
  }
  customizeColumns(c: any){

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
 
  customizeCaptionAmount(data: { value: number; }){
    return ''+data.value.toFixed(2);
  }
}
