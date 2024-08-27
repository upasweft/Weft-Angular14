import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { WeftHttpService } from 'src/app/core/services/weft-http.service';
import { WeftAPIConfig } from 'src/app/shared/weft-api-config';
import 'jspdf-autotable';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import jsPDF from 'jspdf';
import { UsedqrviewComponent } from '../usedqrview/usedqrview.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import dxDataGrid from 'devextreme/ui/data_grid';

@Component({
  selector: 'app-usedqrcodesmangement',
  templateUrl: './usedqrcodesmangement.component.html',
  styleUrls: ['./usedqrcodesmangement.component.scss']
})
export class UsedqrcodesmangementComponent implements OnInit {
  public title: string = 'Used Qr Code Report';
  public getGridDataApi: string = WeftAPIConfig.qrCodeService+'/usedqrCodereport';
  public gridKey: string = 'GRD';
  public keyField: string = "productId";
  public isReport :boolean = false;
  public columnDefs: any[];
  public resourceKey: string = 'invoiceReportData';
  resourceKeyValue: any;
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;
  today = new Date();
  headerDate!: string;
  gridManagementForm: any;
  dataSource: any;
  bsModalRef: any;
  
  constructor(public route: ActivatedRoute,private modalService: BsModalService,
    private httpService: WeftHttpService,
    private toastrService: ToastrService,
    private fb: FormBuilder,) {
    this.columnDefs = [
    // {dataField : 'slNo',caption : 'Sl.No', alignment: 'left'},
      //{dataField : 'invoiceNo',caption : 'Invoice No'},
      {dataField : 'qrCode',caption : 'Qr Code'},
    {dataField : 'usedTime',caption : 'Used Date & Time',dataType: 'datetime'},
    { dataField : 'imageCount', caption : 'Image Count'}, 
  
  ];
  }
  // customizeCaptionAmount(data){
  //   return ''+data.value.toFixed(2);
  // }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const paramValue = params.get(this.resourceKey);
      if (paramValue) {
        this.resourceKeyValue = JSON.parse(paramValue);
        this.headerDate = this.title + " - DATE FROM " +
          this.resourceKeyValue.dateFrom +
          " TO " +
          this.resourceKeyValue.dateTo;
        this.createForm();
        this.bindToDataSource();
      }
    });
  }                    
  createForm() {
    this.gridManagementForm = this.fb.group({ search: new FormControl('') });
  }

  bindToDataSource() {
    this.httpService.post(this.getGridDataApi, this.resourceKeyValue).subscribe(result => {
      if (result) {
        this.dataSource = result.map((item: any, index: number) => ({ ...item, slNo: index + 1 })); 
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
  onView(e: any,c: { data: { qrCode: any; }; })
  {

    this.bsModalRef = this.modalService.show(UsedqrviewComponent, {
      initialState: {
        id: c.data.qrCode
      }, class: 'modal-dialog-centered modal-lg used-qr-view-modal'
    });
  }
}
