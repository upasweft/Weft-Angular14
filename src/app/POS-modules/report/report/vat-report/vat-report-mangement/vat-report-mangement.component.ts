import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import * as moment from 'moment';

@Component({
  selector: 'app-vat-report-mangement',
  templateUrl: './vat-report-mangement.component.html',
  styleUrls: ['./vat-report-mangement.component.scss']
})
export class VatReportMangementComponent implements OnInit {
  public title: string = 'VAT Report';
  public getGridDataApi: string = WeftAPIConfig.invoiceService+'/vatreport';
  public gridKey: string = 'GRD';
  public keyField: string = "productId";
  public isReport :boolean = false;
  public columnDefs: any[];
  public resourceKey: string = 'vatReportData';
  resourceKeyValue: any;
  dataGrid: any;
  today = new Date();
  headerDate!: string;
  gridManagementForm: any;
  dataSource: any;
  
  constructor(public route: ActivatedRoute,
    private httpService: WeftHttpService,
    private toastrService: ToastrService,
    private fb: FormBuilder,) {
    this.columnDefs = [
      { dataField: 'status', caption: 'Type', groupIndex: 0 },
      {dataField : 'slNo',caption : 'Sl.No', alignment: 'left'},
      {dataField : 'invoiceNo',caption : 'Invoice No'},
    //  {dataField : 'refNum',caption : 'Ref Number'},
      {dataField : 'site',caption : 'Site Name'},
    { dataField : 'invoiceDate', caption : 'Date',dataType: "date", format: "dd/MM/yyyy",},
    { dataField : 'vatableAmount', caption : 'Vatable Amount',format: { type: 'fixedPoint', precision: 2 }},
    { dataField : 'vatAmount', caption : 'VAT',format: { type: 'fixedPoint', precision: 2 }},
    { dataField : 'amount', caption : 'Amount',format: { type: 'fixedPoint', precision: 2 }},
   // {dataField : 'status',caption : 'Status'},
  ];
  }
  customizeCaptionAmount(data: { value: number; }){
    return ''+data.value.toFixed(2);
  }
  
  ngOnInit() {
    if (this.route.snapshot.paramMap.get(this.resourceKey)) {
      this.route.paramMap.subscribe((params) => {
        const resourceKeyValue = params.get(this.resourceKey);
        if (resourceKeyValue) {
          this.resourceKeyValue = JSON.parse(resourceKeyValue);
        }
      });
    }
    this.createForm();
   // this.bindToDataSource();
    this.headerDate = this.title + " - DATE FROM " +
    this.resourceKeyValue.dateFrom +
    " TO " +
    this.resourceKeyValue.dateTo;
  }

  createForm() {
    this.gridManagementForm = this.fb.group({ search: new FormControl('') });
  }

  bindToDataSource() {
    this.httpService.post(this.getGridDataApi, this.resourceKeyValue).subscribe(result => {
      if (result) {
        this.dataSource = result.map((item: any, index: number) => ({ ...item, serialNumber: index + 1 })); 
       console.log(this.dataSource)
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
  
}
