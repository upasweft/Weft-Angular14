import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';

@Component({
  selector: 'app-voidreport-mangement',
  templateUrl: './voidreport-mangement.component.html',
  styleUrls: ['./voidreport-mangement.component.scss']
})
export class VoidreportMangementComponent implements OnInit {
  public title: string = 'Void Report';
  public getGridDataApi: string = WeftAPIConfig.invoiceService+'/voidreport';
  public gridKey: string = 'GRD';
  public keyField: string = "productId";
  public isReport :boolean = false;
  public columnDefs: any[];
  public resourceKey: string = 'voidReportData';
  resourceKeyValue: any;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  today = new Date();
  headerDate: string;
  gridManagementForm: any;
  dataSource: any;
  
  constructor(public route: ActivatedRoute,
    private httpService: WeftHttpService,
    private toastrService: ToastrService,
    private fb: FormBuilder,) {
    this.columnDefs = [
    {dataField : 'slNo',caption : 'Sl.No', alignment: 'left'},
    { dataField : 'docDate', caption : 'Doc Date',dataType: "date", format: "dd/MM/yyyy",},
    { dataField : 'voidDate', caption : 'Void Date',dataType: "date", format: "dd/MM/yyyy",},
      {dataField : 'invoiceNo',caption : 'Invoice No'},
      {dataField : 'refNum',caption : 'Ref Number'},
      {dataField : 'siteName',caption : 'Site Name'},
  ];
  }
  customizeCaptionAmount(data){
    return ''+data.value.toFixed(2);
  }
  
  ngOnInit() {
    if (this.route.snapshot.paramMap.get(this.resourceKey)) {
      this.route.paramMap.subscribe((params) => {
        this.resourceKeyValue = JSON.parse((params.get(this.resourceKey)));
      });
    }
    this.createForm();
    //this.bindToDataSource();
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
        this.dataSource = result.map((item, index) => ({ ...item, slNo: index + 1 })); 
      }
    })
}

  customizeColumns(columns) {
   columns[3].alignment = "left";
  }

  generatePDF(event) {
    this.transferData(this.dataGrid.instance);
  }
  
  transferData(event) {
    const doc = new jsPDF('l', 'px', 'a4'), fontSize = 10;
    let coordX = 0, coordY = 0;
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: event,
      autoTableOptions: {
        showHead: "everyPage",
        margin: { right: 20, left: 30, top: 55, bottom: 20 },
        showFoot: "lastPage",
        theme: 'plain',
        headStyles: { fontSize: 8, lineColor: [255, 255, 255], textColor: [0, 0, 0], textStyle: "bold" },
        bodyStyles: { fontSize: 8, lineColor: [255, 255, 255] },
        footStyles: { fontSize: 9, lineColor: [255, 255, 255] },
        tableLineColor: [255, 255, 255],
        didDrawPage: data => {
          coordX = data.cursor.x;
          coordY = data.cursor.y;
        },
      }
    }).then(() => {
      const pages = doc.getNumberOfPages();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      let horizontalPos = pageWidth / 2;
      let verticalPos = pageHeight - 10;
      doc.setFontSize(10);
      for (let j = 1; j < pages + 1; j++) {
        doc.setPage(j);
        doc.setDrawColor(0, 0, 0);
        doc.line(5, 43, 623, 43);
        // doc.line(10, 57, 620, 57);
         doc.line(10, 73, 620, 73);
        if (j== pages) {
         // doc.line(10, coordY - 15, 620, coordY - 15); //Footer line - up
         // doc.line(10, coordY, 620, coordY); //Footer line - down
        }
        doc.setFontSize(14);
        doc.setFontSize(12);
       // doc.text("HEAD OFFICE", horizontalPos, 32, { align: "center" });
        doc.setFontSize(10);
        doc.text(this.title.toLocaleUpperCase(),horizontalPos, 32, { align: "center" });
        //doc.text("DATE FROM " + moment(this.today).format("MM/DD/YYYY") + " TO " + moment(this.today).format("MM/DD/YYYY"), 484, 53);
        doc.text("Printed on: " + moment(this.today).format("MM/DD/YYYY"), 10, verticalPos)
       
        doc.setFontSize(10);
        doc.text(`Page ${j} of ${pages}`, horizontalPos, verticalPos, { align: 'center' });
      }
      doc.output('dataurlnewwindow')
      doc.save(this.title + '.pdf');
    })
}
}